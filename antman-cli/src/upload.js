import archiver from 'archiver'
import fs from 'fs-extra'
import path from 'path'
import {run} from 'yacol'
import request from './request.js'

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

function* up(apiKey, host, hostPath, folder) {
  const archive = archiver('zip')
  const [uploadReq, response] = request(host, {
    path: hostPath,
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
    return result.body
  }
}

export function* upload(apiKey, host, folder) {
  const body = yield run(up, apiKey, host, '/$upload', folder)
  console.log(`Deploy successful on ${deployedUrl(host, body, true)}`)
  return body
}

export function* home(apiKey, host, folder) {
  const body = yield run(up, apiKey, host, '/$home', folder)
  console.log('Homepage successfully uploaded')
  return body
}

export function* link(apiKey, host, folder, docId) {
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
