import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import c from './config'
import {sendNotFound, sendNotEnoughRights} from './errorPages.js'
import {sendToLogin, login, oauth} from './authorize.js'
import {aliasToDocId, serveDoc} from './serveDoc.js'
import {isIdValid, uuid} from './id.js'
import {unauthorized, notFound, notEnoughRights} from './exceptions.js'
import r from './routes.js'
import html from './app/html'

const app = express()

app.enable('trust proxy')

if (c.isHttps) {
  app.use((req, res, next) => {
    if (!req.secure && req.header('x-forwarded-proto') !== 'https') {
      res.redirect(301, `https://${req.hostname}${req.url}`)
    } else {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000')
      next()
    }
  })
}

const s3 = c.s3

app.use(cookieParser())
app.use(favicon(path.join(__dirname, '../assets', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '../assets')))

async function drafts(req, res) {
  return await serveDoc(req.params.docId, req.params[0], req, res)
}

async function docs(req, res) {
  const docId = await aliasToDocId(req.params.name)
  return await serveDoc(docId, req.params[0], req, res)
}

function assertApiKey(req, res) {
  if (req.get('Authorization') !== c.apiKey) {
    res.status(401).send('Invalid API Key')
    return false
  }
  return true
}

async function upload(req, res) {
  if (!assertApiKey(req, res)) return

  const docId = uuid()
  await s3.unzip(req, path.join(c.draftPath, docId))
  res.status(200).send(docId)
}

async function alias(req, res) {
  if (!assertApiKey(req, res)) return

  const {docId, name} = req.params
  const isReqValid = isIdValid(docId) && isIdValid(name)
  if (!isReqValid) {
    res.status(400).send('Invalid request.')
    return
  }

  await s3.writeFile(path.join(c.finalPath, name), docId)
  res.status(200).send()
}

function index(req, res) {
  if (!c.disableAuth && req.cookies.access_token == null) throw unauthorized
  res.send(html())
}

const esc = (s) => s.replace('$', '\\$')

// Wrapper for web requests to handle exceptions from standard flow.
const web = (handler) =>
  async function (req, res) {
    try {
      await handler(req, res)
    } catch (e) {
      if (e === notFound) sendNotFound(res)
      else if (e === unauthorized) sendToLogin(req, res)
      else if (e === notEnoughRights) sendNotEnoughRights(res)
      else throw e
    }
  }

app.get(esc(r.index), web(index))
app.get(esc(r.login), web(login))
app.get(esc(r.oauth), web(oauth))
app.get(esc(r.drafts), web(drafts))
app.post(esc(r.upload), upload)
app.put(esc(r.alias), alias)

// Has to be the last one, otherwise it would match all other routes.
app.get(r.docs, web(docs))

// eslint-disable-next-line no-console
app.listen(c.port, () => console.log(`App started on localhost:${c.port}.`))
