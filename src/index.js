import c from './config.js'
import path from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import * as http from './utils/http.js'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import html from './app/html.js'
import * as auth from './authorize.js'
import * as doc  from './doc.js'

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
app.get('/', auth.authorize, async (req, res) => res.send(html(await doc.menu())))

// Has to be the last one, otherwise it would match all other routes.
http.register(app, null, doc.routes)

// eslint-disable-next-line no-console
app.listen(c.port, () => console.log(`App started on localhost:${c.port}.`))
