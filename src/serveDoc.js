import {run} from 'yacol'
import path from 'path'
import c from './config'
import memoize from './memoize.js'
import {amICollaborator as _amICollaborator} from './ghApi.js'
import createS3Client from './s3.js'
import {isIdValid} from './id.js'
import {unauthorized, notFound, notEnoughRights} from './exceptions.js'

const s3 = createS3Client(c.s3)

const amICollaborator = memoize(_amICollaborator, c.cacheMaxRecords, c.authorizationMaxAge)

function* checkRights(token, repo) {
  return repo == null || (yield run(amICollaborator, token,
                                   c.ghOrganization, repo))
}

function getDocRoot(docId) {
  if (!isIdValid(docId)) throw notFound
  return path.join(c.draftPath, docId)
}

function absoluteDocPath(docRoot, localPart) {
  localPart = path.normalize(localPart || '/')
  if (localPart.endsWith('/')) localPart += 'index.html'
  if (localPart.startsWith('..')) throw notFound
  return path.join(docRoot, localPart)
}

function* readConfig(docRoot) {
  const configFile = path.join(docRoot, 'docs.json')
  return yield run(function*() {
    const file = yield run(s3.readFile, configFile)
    return JSON.parse(file.Body.toString())
  }).catch((e) => {
    if (e.code === 'NoSuchKey') return {}
    else throw e
  })
}

function* serveS3File(res, path) {
  yield run(function*() {
    const file = yield run(s3.readFile, path)
    res.set('Content-Type', file.ContentType)
    res.set('Content-Length', file.ContentLength)
    res.send(file.Body)
  }).catch((e) => {
    if (e.code === 'NoSuchKey') throw notFound
    else throw e
  })
}

export function* aliasToDocId(alias) {
  return yield run(function*() {
    const file = yield run(s3.readFile, path.join(c.finalPath, alias))
    return file.Body.toString()
  }).catch((e) => {
    if (e.code === 'NoSuchKey') throw notFound
    else throw e
  })
}

export function* serveDoc(docId, localPart, req, res) {
  const docRoot = getDocRoot(docId)
  const docPath = absoluteDocPath(docRoot, localPart)
  const config = yield run(readConfig, docRoot)
  const hasRights = yield run(checkRights, req.cookies.access_token, config.read)

  if (!hasRights) throw notEnoughRights

  yield run(serveS3File, res, docPath)
}
