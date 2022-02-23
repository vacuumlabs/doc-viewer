import p from 'path'
import c from './config.js'
import memoize from './memoize.js'
import * as auth from './authorize.js'
import * as id from './utils/id.js'
import f from './utils/f.js'
import * as http from './utils/http.js'
import defaultStyle from './app/app.style.js'

const s3 = c.s3

const root = (docId) => p.join(c.draftPath, docId)

const loadFile = async (...paths) => await f.try(
  async () => await s3.readFile(p.join(...paths)),
  [[(e) => e.code === 'NoSuchKey', () => null]],
)

const readConfig = memoize(async (docRoot) => {
  const file = await loadFile(docRoot, 'docs.json')
  return file == null ? {} : JSON.parse(file.Body.toString())
}, c.cacheMaxRecords, Infinity)

const httpFile = (file) => ({...http.headers({'Content-Type'  : file.ContentType,
                                              'Content-Length': file.ContentLength}),
                             ...http.body(file.Body)})

// Loading files from S3 with inifinite caching. Use only for immutable files.
const loadDoc = memoize(loadFile, c.cacheMaxRecords, Infinity)

const normalize = http.handler(({path}, body, req) => {
  path = p.normalize(`/${path}`)
  if (path.endsWith('/')) path += 'index.html'

  if (path.startsWith('..')) return http.notFound

  req.params.path = path
  return http.proceed
})

const aliasToDocId = http.handler(async ({name}, body, req) => {
  const file = await loadFile(c.finalPath, name)
  if (file == null) return http.notFound

  req.params.docId = file.Body.toString()
  return http.proceed
})

const requireGroups = http.handler(async ({docId}, body, req) => {
  if (!id.isValid(docId)) return http.notFound

  req.groups = (await readConfig(root(docId))).read
  return http.proceed
})

const serve = async ({docId, path}) => {
  const doc = await loadDoc(root(docId), path)
  if (doc == null) return http.notFound

  return httpFile(doc)
}

const upload = async (param, body, req) => {
  const docId = id.generate()
  await s3.unzip(req, p.join(c.draftPath, docId))
  return http.body(docId)
}

const setHome = async (param, body, req) => {
  await s3.unzip(req, c.homePath)
  return http.ok
}

export const oldHome = async () => {
  const load = async (name) => (await loadFile(c.homePath, name))
                               ?.Body
                               ?.toString()

  const menu     = (await load('old_menu.json')) ?? 'null'
  const config   = (await load('config.json'))   ?? 'null'
  const style    = (await load('old_style.css')) ?? defaultStyle
  const notionLinkProps = 'null'

  return {menu: JSON.parse(menu), config: JSON.parse(config), style, notionLinkProps}
}

export const home = async () => {
  const load = async (name) => (await loadFile(c.homePath, name))
                               ?.Body
                               ?.toString()

  const menu     = (await load('menu.json'))        ?? 'null'
  const config   = (await load('config.json'))      ?? 'null'
  const style    = (await load('style.css'))        ?? defaultStyle
  const notionLinkProps = (await load('text.json')) ?? 'null'

  return {menu: JSON.parse(menu), config: JSON.parse(config), style, notionLinkProps: JSON.parse(notionLinkProps)}
}

const alias = async ({docId, name}) => {
  if (!id.isValid(docId) || !id.isValid(name)) return http.bad

  await s3.writeFile(p.join(c.finalPath, name), docId)
  return http.ok
}

const mw = [normalize, requireGroups, auth.authorize]

export const routes =
[['get' , '/\\$drafts/:docId/:path(*)', serve  ,               ...mw],
 ['get' , '/:name/:path(*)'           , serve  , aliasToDocId, ...mw],
 ['post', '/\\$upload'                , upload , auth.authorizeApiKey],
 ['post', '/\\$home'                  , setHome, auth.authorizeApiKey],
 ['put' , '/\\$alias/:docId/:name'    , alias  , auth.authorizeApiKey]]
