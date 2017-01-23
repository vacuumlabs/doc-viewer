import path from 'path'
import express from 'express'
import {expressHelpers, run} from 'yacol'
import cookieParser from 'cookie-parser'
import fetch from 'node-fetch'
import c from './config'
import {authorizeUrl, accessToken, amICollaborator as _amICollaborator, unauthorized} from './ghApi.js'
import memoize from './memoize'
import createS3Client from './s3.js'

const app = express()
const {register, runApp} = expressHelpers
const amICollaborator = memoize(_amICollaborator, c.cacheMaxRecords, c.authorizationMaxAge)
const s3 = createS3Client(c.s3)

app.use(cookieParser())

function saveCookie(res, key, value) {
  res.cookie(key, value, {httpOnly: true, secure: c.isHttps})
}

function sendToLogin(req, res) {
  saveCookie(res, 'redirectAfterLogin', req.url)
  res.redirect(r.login)
}

function* checkRights(req, repo) {
  if (repo == null) return true

  const token = req.cookies.access_token
  if (!token) throw unauthorized

  return yield run(amICollaborator, token, c.ghOrganization, repo)
}

function* login(req, res) {
  res.redirect(authorizeUrl(c.ghClient))
}

function* oauth(req, res) {
  const token = yield run(accessToken, c.ghClient, req.query.code)

  if (token) {
    saveCookie(res, 'access_token', token)
    res.redirect(req.cookies.redirectAfterLogin || r.index)
  } else {
    res.redirect(r.login)
  }
}

const validDocId = (docId) => docId && docId.match(/^[a-zA-Z0-9-_]*$/)

function* serveDoc(docId, localPart, req, res) {
  localPart = path.normalize(localPart || '/')
  if (localPart.endsWith('/')) localPart += 'index.html'

  const isReqValid = validDocId(docId) && !localPart.startsWith('..')

  if (!isReqValid) {
    res.status(404).send('Not Found')
    return
  }

  const docRoot = path.join(c.draftPath, docId)

  const configFile = path.join(docRoot, 'docs.json')
  const config = yield run(function*() {
    const file = yield run(s3.readFile, configFile)
    return JSON.parse(file.Body.toString())
  }).catch((e) => {
    if (e.code === 'NoSuchKey') return {}
    else throw e
  })

  yield run(function*() {
    const hasRights = yield run(checkRights, req, config.read)

    if (hasRights) {
      yield run(function*() {
        const file = yield run(s3.readFile, path.join(docRoot, localPart))
        res.set('Content-Type', file.ContentType)
        res.set('Content-Length', file.ContentLength)
        res.send(file.Body)
      }).catch((e) => {
        if (e.code === 'NoSuchKey') res.status(404).send('Not Found')
        else throw e
      })
    } else {
      res.status(401).send('You do not have rights to access these docs.')
    }
  }).catch((e) => {
    if (e === unauthorized) sendToLogin(req, res)
    else throw e
  })
}

function* drafts(req, res) {
  yield run(serveDoc, req.params.docId, req.params[0], req, res)
}

function* docs(req, res) {
  const docId = yield run(function*() {
    const file = yield run(s3.readFile, path.join(c.finalPath, req.params.name))
    return file.Body.toString()
  }).catch((e) => {
    if (e.code === 'NoSuchKey') res.status(404).send('Not Found')
    else throw e
  })

  yield run(serveDoc, docId, req.params[0], req, res)
}

function assertApiKey(req, res) {
  if (req.get('Authorization') !== c.apiKey) {
    res.status(401).send('Invalid API Key')
    return false
  }
  return true
}

function* upload(req, res) {
  if (!assertApiKey(req, res)) return

  const docId = Math.floor((Date.now() + Math.random())*1000).toString(36)
  yield run(s3.unzip, req, path.join(c.draftPath, docId))
  res.status(200).send(docId)
}

function* alias(req, res) {
  if (!assertApiKey(req, res)) return

  const {docId, name} = req.params
  const isReqValid = validDocId(docId) && validDocId(name)
  if (!isReqValid) {
    res.status(400).send('Invalid request.')
    return
  }

  yield run(s3.writeFile, path.join(c.finalPath, name), docId)
  res.status(200).send()
}

function* index(req, res) {
  res.send('Nothing interesting here.')
}

const r = {
  index: '/',
  login: '/$login',
  oauth: '/$oauth',
  drafts: '/$drafts/:docId/*?',
  upload: '/$upload',
  alias: '/$alias/:docId/:name',
  docs: '/:name/*?',
}

const esc = (s) => s.replace('$', '\\$')

register(app, 'get', esc(r.index), index)
register(app, 'get', esc(r.login), login)
register(app, 'get', esc(r.oauth), oauth)
register(app, 'get', esc(r.drafts), drafts)
register(app, 'post', esc(r.upload), upload)
register(app, 'put', esc(r.alias), alias)

// Has to be the last one, otherwise it would match all other routes.
register(app, 'get', r.docs, docs)

run(function* () {
  run(runApp)
  app.listen(c.port, () =>
    console.log(`App started on localhost:${c.port}.`)
  )
})
