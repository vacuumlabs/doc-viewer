import querystring from 'querystring'
import express from 'express'
import {expressHelpers, run} from 'yacol'
import cookieParser from 'cookie-parser'
import fetch from 'node-fetch'
import c from './config'

const app = express()
const {register, runApp} = expressHelpers

app.use(cookieParser())

function* main(req, res) {
  const token = req.cookies.access_token
  if (!token) {
    res.redirect('/login')
    return
  }

  res.send(`Access Token: ${token}`)
}

function* login(req, res) {
  const url = 'https://github.com/login/oauth/authorize'
  const query = {
    scope: 'user:email',
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
    res.redirect('/')
  } else {
    res.redirect('/login')
  }
}

register(app, 'get', '/', main)
register(app, 'get', '/login', login)
register(app, 'get', '/oauth', oauth)

run(function* () {
  run(runApp)
  app.listen(c.port, () =>
    console.log(`App started on localhost:${c.port}.`)
  )
})
