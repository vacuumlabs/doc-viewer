import archiver from 'archiver'
import fs from 'fs-promise'
import path from 'path'
import {run} from 'yacol'
import transenv from 'transenv'
import parseArgs from 'minimist'
import request from './request.js'

const apiKey = transenv()(({str}) => str('API_KEY'))

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

function getResult(response) {
  return new Promise((resolve, reject) => {
    const data = []
    response.on('data', (d) => data.push(d))
    response.on('error', (e) => reject(e))
    response.on('end', () => resolve({...response, body: data.join('')}))
  })
}

function deployedUrl(host, docId, isDraft) {
  return `${host}${isDraft ? '/$drafts' : ''}/${docId}/`
}

function* upload(host, folder) {
  const archive = archiver('zip')
  const [uploadReq, response] = request(host, {
    path: '/$upload',
    method: 'POST',
    apiKey: apiKey,
  })

  uploadReq.on('close', () => uploadReq.end())

  archive.pipe(uploadReq)

  archive.glob('**/*', {
    dot: false,
    cwd: folder,
    ignore: yield run(ignore, folder)
  })
  archive.finalize()

  const result = yield getResult(yield response)
  if (result.statusCode !== 200) {
    throw new Error(`Server returned: HTTP ${result.statusCode} -- ${result.body}`)
  } else{
    console.log(`Deploy successful on ${deployedUrl(host, result.body, true)}`)
    return result.body
  }
}

function* link(host, folder, docId) {
  const configFile = path.join(folder, 'docs.json')
  const config = JSON.parse(yield fs.readFile(configFile, 'utf-8'))
  if (!config.alias) throw new Error(`Alias not defined in ${configFile}`)

  const [req, response] = request(host, {
    path: `/$alias/${docId}/${config.alias}`,
    method: 'PUT',
    apiKey: apiKey,
  })

  req.end()
  const result = yield getResult(yield response)

  if (result.statusCode !== 200) {
    throw new Error(`Server returned: HTTP ${result.statusCode} -- ${result.body}`)
  } else{
    console.log(`Deploy successful on ${deployedUrl(host, config.alias, false)}`)
    return result.body
  }
}

const args = parseArgs(process.argv.slice(2), {
  alias: {'alias': 'a'},
  'boolean': ['alias'],
  })

const host = args['_'][0]
const folder = args['_'][1]

if (!folder || !host) {
  console.log(`usage: yarn run upload -- [-a] host folder`)
  process.exit(0)
}

run(function* () {
  const docId = yield run(upload, host, folder)
  if (args.alias) {
    yield run(link, host, folder, docId)
  }
})
