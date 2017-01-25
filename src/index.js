import path from 'path'
import express from 'express'
import {expressHelpers, run} from 'yacol'
import cookieParser from 'cookie-parser'
import c from './config'
import createS3Client from './s3.js'
import {sendNotFound} from './errorPages.js'
import {login, oauth} from './authorize.js'
import {notFound, aliasToDocId, serveDoc} from './serveDoc.js'
import r from './routes.js'

const app = express()
const {register, runApp} = expressHelpers
const s3 = createS3Client(c.s3)

app.use(cookieParser())

function* drafts(req, res) {
  yield run(serveDoc, req.params.docId, req.params[0], req, res)
}

function* docs(req, res) {
  yield run(function*() {
    const docId = yield run(aliasToDocId, req.params.name)
    yield run(serveDoc, docId, req.params[0], req, res)
  }).catch((e) => {
    if (e === notFound) sendNotFound(res)
  })
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
