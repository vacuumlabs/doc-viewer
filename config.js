import e from './env.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const {bool, env, getErrors} = e(process.env)

const toAbsolute = (p) => path.isAbsolute(p) ? p : path.join(__dirname, p)

export default {
  port: env('PORT'),
  ghClient: {
    id: env('GH_CLIENT_ID'),
    secret: env('GH_CLIENT_SECRET'),
  },
  ghOrganization: env('GH_ORGANIZATION'),
  docsPath: toAbsolute(env('DOCS_PATH')),
}

getErrors()
