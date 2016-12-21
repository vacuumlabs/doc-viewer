import e from './env.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const {bool, env, getErrors} = e(process.env)

const toAbsolute = (p) => path.isAbsolute(p) ? p : path.join(__dirname, p)

export default {
  isHttps: env('PROTOCOL').toLowerCase() === 'https:',
  apiKey: env('API_KEY'),
  port: env('PORT'),
  authorizationMaxAge: env('AUTHORIZATION_MAX_AGE'),
  cacheMaxRecords: 1000,
  ghClient: {
    id: env('GH_CLIENT_ID'),
    secret: env('GH_CLIENT_SECRET'),
  },
  ghOrganization: env('GH_ORGANIZATION'),
  docsPath: toAbsolute(env('DOCS_PATH')),
  draftFolder: 'draft',
  finalFolder: 'final',
}

getErrors()
