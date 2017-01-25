import path from 'path'
import express from 'express'
import {expressHelpers, run} from 'yacol'
import cookieParser from 'cookie-parser'
import c from './config'
import {sendNotFound, sendNotEnoughRights} from './errorPages.js'
import {sendToLogin, login, oauth} from './authorize.js'
import {aliasToDocId, serveDoc} from './serveDoc.js'
import {isIdValid, uuid} from './id.js'
import {unauthorized, notFound, notEnoughRights} from './exceptions.js'
import r from './routes.js'

require('now-logs')(c.apiKey)

const app = express()
const {register, runApp} = expressHelpers
const s3 = c.s3

app.use(cookieParser())

function* drafts(req, res) {
  yield run(serveDoc, req.params.docId, req.params[0], req, res)
}

function* docs(req, res) {
  const docId = yield run(aliasToDocId, req.params.name)
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

  const docId = uuid()
  yield run(s3.unzip, req, path.join(c.draftPath, docId))
  res.status(200).send(docId)
}

function* alias(req, res) {
  if (!assertApiKey(req, res)) return

  const {docId, name} = req.params
  const isReqValid = isIdValid(docId) && isIdValid(name)
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

const esc = (s) => s.replace('$', '\\$')

// Wrapper for web requests to handle exceptions from standard flow.
const web = (handler) => function* (req, res) {
  yield run(handler, req, res).catch((e) => {
    if (e === notFound) sendNotFound(res)
    else if (e === unauthorized) sendToLogin(req, res)
    else if (e === notEnoughRights) sendNotEnoughRights(res)
    else throw e
  })
}

register(app, 'get', esc(r.index), web(index))
register(app, 'get', esc(r.login), web(login))
register(app, 'get', esc(r.oauth), web(oauth))
register(app, 'get', esc(r.drafts), web(drafts))
register(app, 'post', esc(r.upload), upload)
register(app, 'put', esc(r.alias), alias)

// Has to be the last one, otherwise it would match all other routes.
register(app, 'get', r.docs, web(docs))

run(function* () {
  run(runApp)
  app.listen(c.port, () =>
    console.log(`App started on localhost:${c.port}.`)
  )
})
