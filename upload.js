import archiver from 'archiver'
import fs from 'mz/fs'
import path from 'path'
import {run} from 'yacol'
import http from 'http'
import https from 'https'
import e from './env.js'
import parseArgs from 'minimist'
import fetch from 'node-fetch'

const {bool, env, getErrors} = e()
const request = (bool('HTTPS') ? https : http).request

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

function baseUrl() {
  const protocol = bool('HTTPS') ? 'https:' : 'http:'
  const defaultPorts = {'http:': '80', 'https:': '443'}
  const portPart = env('PORT') !== defaultPorts[protocol] ? `:${env('PORT')}` : ''
  return `${protocol}//${env('HOST')}${portPart}`

}

const deployedUrl = (docId, isDraft) => `${baseUrl()}/${isDraft ? 'drafts' : 'docs'}/${docId}/`

function* upload(folder) {
  const archive = archiver('zip')
  const {promise, callback} = response()
  const uploadReq = request({
    host: env('HOST'),
    port: env('PORT'),
    path: '/$upload',
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
    console.log(`Deploy successful on ${deployedUrl(result.body, true)}`)
    return result.body
  }
}

function* link(folder, docId) {
  const configFile = path.join(folder, 'docs.json')
  const config = JSON.parse(yield fs.readFile(configFile, 'utf-8'))
  if (!config.alias) throw new Error(`Alias not defined in ${configFile}`)

  const url = `${baseUrl()}/$alias/${docId}/${config.alias}`
  const result = yield fetch(url, {
    method: 'PUT',
    headers: {'Authorization': env('API_KEY')}
  })

  if (result.status !== 200) {
    const body = yield result.text()
    throw new Error(`Server returned: HTTP ${result.status} -- ${body}`)
  } else{
    console.log(`Deploy successful on ${deployedUrl(config.alias, false)}`)
    return result.body
  }
}

const args = parseArgs(process.argv.slice(2), {
  alias: {'alias': 'a'},
  'boolean': ['alias'],
  })

const folder = args['_'][0]

if (!folder) {
  console.log(`usage: yarn run upload -- [-a] folder`)
  process.exit(0)
}

run(function* () {
  const docId = yield run(upload, folder)
  if (args.alias) {
    yield run(link, folder, docId)
  }
})
