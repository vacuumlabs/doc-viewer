import querystring from 'querystring'
import path from 'path'
import express from 'express'
import {expressHelpers, run} from 'yacol'
import cookieParser from 'cookie-parser'
import fetch from 'node-fetch'
import fs from 'mz/fs'
import c from './config'
import {amICollaborator, errorUnauthorized} from './ghApi.js'

const app = express()
const {register, runApp} = expressHelpers

app.use(cookieParser())

function sendToLogin(req, res) {
  res.cookie('redirectAfterLogin', req.url, {httpOnly: true})
  res.redirect('/login')
}

function* checkRights(req, repo) {
  if (repo == null) return true

  const token = req.cookies.access_token
  if (!token) return {error: errorUnauthorized}

  return yield run(amICollaborator, token, c.ghOrganization, repo)
    .catch((e) => {
      if (e.error === errorUnauthorized) return e
      else throw(e)
    })
}

function* login(req, res) {
  const url = 'https://github.com/login/oauth/authorize'
  const query = {
    scope: 'repo',
    client_id: c.ghClient.id,
  }
  res.redirect(`${url}?${querystring.stringify(query)}`)
}

function* oauth(req, res) {
  const url = 'https://github.com/login/oauth/access_token'

  const authParams = {
    client_id: c.ghClient.id,
    client_secret: c.ghClient.secret,
    code: req.query.code,
    accept: 'json'
  }

  const authRes = yield fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authParams)
  })

  const authJSON = yield authRes.json()
  if (authJSON.access_token) {
    res.cookie('access_token', authJSON.access_token, {httpOnly: true})
    res.redirect(req.cookies.redirectAfterLogin || '/')
  } else {
    res.redirect('/login')
  }
}

function* docs(req, res) {
  const docId = req.params.docId
  const localPart = path.normalize(req.params[0] || '/')

  const isReqValid =
      docId
      && docId.match(/^[a-zA-Z0-9]*$/)
      && !localPart.startsWith('..')

  if (!isReqValid) {
    res.status(404).send('Not Found')
    return
  }

  const root = path.join(c.docsPath, docId)

  const configFile = path.join(root, 'docs.json')
  const config = (yield fs.stat(configFile)).isFile()
      ? JSON.parse(yield fs.readFile(configFile, 'utf-8'))
      : {}

  const hasRights = yield run(checkRights, req, config.read)

  if (hasRights.error) {
    sendToLogin(req, res)
    return
  } else if (hasRights === true) {
    res.sendFile(path.join(root, localPart))
    return
  } else if (hasRights === false) {
    res.status(401).send('You do not have rights to access these docs.')
  }
}

function* index(req, res) {
  res.send('Nothing interesting here.')
}

register(app, 'get', '/', index)
register(app, 'get', '/login', login)
register(app, 'get', '/oauth', oauth)
register(app, 'get', '/docs/:docId/*?', docs)

run(function* () {
  run(runApp)
  app.listen(c.port, () =>
    console.log(`App started on localhost:${c.port}.`)
  )
})
