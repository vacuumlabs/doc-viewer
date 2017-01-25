import {run} from 'yacol'
import path from 'path'
import c from './config'
import memoize from './memoize.js'
import {sendToLogin} from './authorize.js'
import {sendNotFound, sendNotEnoughRights} from './errorPages.js'
import {amICollaborator as _amICollaborator, unauthorized} from './ghApi.js'
import createS3Client from './s3.js'

const s3 = createS3Client(c.s3)

const amICollaborator = memoize(_amICollaborator, c.cacheMaxRecords, c.authorizationMaxAge)

const notFound = {error: Symbol('notFound')}
const notEnoughRights = {error: Symbol('notEnoughRights')}


function* checkRights(token, repo) {
  return repo == null || (yield run(amICollaborator, token,
                                   c.ghOrganization, repo))
}

function getDocRoot(docId) {
  if (!(docId && docId.match(/^[a-zA-Z0-9-_]*$/))) throw notFound
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

export function* serveDoc(docId, localPart, req, res) {
  yield run(function*() {
    const docRoot = getDocRoot(docId)
    const docPath = absoluteDocPath(docRoot, localPart)
    const config = yield run(readConfig, docRoot)
    const hasRights = yield run(checkRights, req.cookies.access_token, config.read)

    if (!hasRights) throw notEnoughRights

    yield run(serveS3File, res, docPath)

  }).catch((e) => {
    if (e === notFound) sendNotFound(res)
    else if (e === unauthorized) sendToLogin(req, res)
    else if (e === notEnoughRights) sendNotEnoughRights(res)
    else throw e
  })
}
