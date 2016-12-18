import e from './env.js'
import dotenv from 'dotenv'
dotenv.config()

const {bool, env, getErrors} = e(process.env)

export default {
  port: env('PORT')
}

getErrors()
