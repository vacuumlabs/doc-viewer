import e from './env.js'
import dotenv from 'dotenv'
dotenv.config()

const {bool, env, getErrors} = e(process.env)

export default {
  port: env('PORT'),
  ghClient: {
    id: env('GH_CLIENT_ID'),
    secret: env('GH_CLIENT_SECRET'),
  },
  ghOrganization: env('GH_ORGANIZATION'),
}

getErrors()
