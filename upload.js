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

function* upload(folder) {
  const archive = archiver('zip')
  const uploadReq = http.request({
    protocol: env('PROTOCOL'),
    host: env('HOST'),
    port: env('PORT'),
    path: '/upload',
    method: 'PUT',
  })
  getErrors()

  uploadReq.on('close', () => uploadReq.end())

  archive.pipe(uploadReq)

  archive.glob('**/*', {
    dot: true,
    cwd: folder,
    ignore: yield run(ignore, folder)
  })
  archive.finalize()
}

const folder = process.argv[2]

if (!folder) {
  console.log(`Usage: yarn run upload <folder-to-upload>`)
  process.exit(0)
}
run(upload, process.argv[2])
