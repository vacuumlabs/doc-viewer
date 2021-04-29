import path from 'path'
import c from './config'
import memoize from './memoize.js'
import {amICollaborator as _amICollaborator} from './ghApi.js'
import {isIdValid} from './id.js'
import {notFound, notEnoughRights} from './exceptions.js'

const s3 = c.s3

const amICollaborator = memoize(
  _amICollaborator,
  c.cacheMaxRecords,
  c.authorizationMaxAge,
)

async function checkRights(token, repo) {
  return (
    c.disableAuth ||
    repo == null ||
    (await amICollaborator(token, c.ghOrganization, repo))
  )
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

async function _readConfig(docRoot) {
  const configFile = path.join(docRoot, 'docs.json')
  try {
    const file = await s3.readFile(configFile)
    return JSON.parse(file.Body.toString())
  } catch (e) {
    if (e.code === 'NoSuchKey') return {}
    else throw e
  }
}

const readConfig = memoize(_readConfig, c.cacheMaxRecords, Infinity)

async function loadFile(path) {
  try {
    return await s3.readFile(path)
  } catch (e) {
    if (e.code === 'NoSuchKey') throw notFound
    else throw e
  }
}

function serveFile(res, file) {
  res.set('Content-Type', file.ContentType)
  res.set('Content-Length', file.ContentLength)
  res.send(file.Body)
}

export async function aliasToDocId(alias) {
  const file = await loadFile(path.join(c.finalPath, alias))
  return file.Body.toString()
}

// Loading files from S3 with inifinite caching. Use only for immutable files.
const loadDoc = memoize(loadFile, c.cacheMaxRecords, Infinity)

export async function serveDoc(docId, localPart, req, res) {
  const docRoot = getDocRoot(docId)
  const docPath = absoluteDocPath(docRoot, localPart)
  const filePromise = loadDoc(docPath)
  const config = await readConfig(docRoot)
  const hasRights = await checkRights(req.cookies.access_token, config.read)

  if (!hasRights) throw notEnoughRights

  serveFile(res, await filePromise)
}
