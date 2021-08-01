import path from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import * as http from './utils/http.js'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import c from './config.js'
import * as auth from './authorize.js'
import * as doc  from './serveDoc.js'
import {isIdValid, uuid} from './id.js'
import html from './app/html.js'

const s3 = c.s3

// When running in ES Modules mode, Node doesn't provide __dirname. However, it
// can be inferred from import.meta.url.
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.set('trust proxy', true)
app.use(cookieParser())
app.use(express.json())

// Serve static assets
app.use(favicon(path.join(__dirname, '../assets', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '../assets')))

// Register auth routes
http.register(app, '/\\$auth', auth.routes)

// Home Page
app.get('/', auth.authorize, (req, res) => res.send(html()))

async function upload(req, res) {
  const docId = uuid()
  await s3.unzip(req, path.join(c.draftPath, docId))
  res.status(200).send(docId)
}

async function alias(req, res) {
  const {docId, name} = req.params
  const isReqValid = isIdValid(docId) && isIdValid(name)
  if (!isReqValid) {
    res.status(400).send('Invalid request.')
    return
  }

  await s3.writeFile(path.join(c.finalPath, name), docId)
  res.status(200).send()
}

app.post('/\\$upload', auth.authorizeApiKey, upload)
app.put('/\\$alias/:docId/:name', auth.authorizeApiKey, alias)

// Has to be the last one, otherwise it would match all other routes.
http.register(app, null, doc.routes)

// eslint-disable-next-line no-console
app.listen(c.port, () => console.log(`App started on localhost:${c.port}.`))
