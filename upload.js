import archiver from 'archiver'
import fs from 'mz/fs'
import path from 'path'
import {run} from 'yacol'
import http from 'http'
import e from './env.js'
import dotenv from 'dotenv'
dotenv.config()

const {env, getErrors} = e(process.env)

function* ignore(folder) {
  const ignoreFile = path.join(folder, '.docsignore')
  const parse = (f) => f.split('\n')
      .map((s) => s.trim())
      .filter((s) => !s.match(/^#/) && s !== '')


  return yield run(function*() {
    return parse(yield fs.readFile(ignoreFile, 'utf-8'))
  }).catch((e) => {
    if (e.code === 'ENOENT') return []
    else throw e
  })
}

function response() {
  let resolve, reject

  return {
    promise: new Promise((res, rej) => {
      resolve = res
      reject = rej
    }),
    callback: (res) => {
      const data = []
      res.on('data', (d) => data.push(d))
      res.on('error', (e) => reject(e))
      res.on('end', () => resolve({...res, body: data.join('')}))
    }
  }
}

function deployedUrl(docId) {
  const protocol = env('PROTOCOL').toLowerCase()
  const defaultPorts = {'http:': '80', 'https:': '443'}

  const portPart = env('PORT') !== defaultPorts[protocol] ? `:${env('PORT')}` : ''

  return `${protocol}//${env('HOST')}${portPart}/drafts/${docId}/`
}

function* upload(folder) {
  const archive = archiver('zip')
  const {promise, callback} = response()
  const uploadReq = http.request({
    protocol: env('PROTOCOL'),
    host: env('HOST'),
    port: env('PORT'),
    path: '/upload',
    method: 'POST',
    headers: {
      'Authorization': env('API_KEY'),
    },
  }, callback)
  getErrors()

  uploadReq.on('close', () => uploadReq.end())

  archive.pipe(uploadReq)

  archive.glob('**/*', {
    dot: false,
    cwd: folder,
    ignore: yield run(ignore, folder)
  })
  archive.finalize()

  const result = yield promise
  if (result.statusCode !== 200) {
    throw new Error(`Server returned: HTTP ${result.statusCode} -- ${result.body}`)
  } else{
    console.log(`Deploy successful on ${deployedUrl(result.body)}`)
  }
}

const folder = process.argv[2]

if (!folder) {
  console.log(`Usage: yarn run upload <folder-to-upload>`)
  process.exit(0)
}
run(upload, process.argv[2])
