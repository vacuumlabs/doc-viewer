import express from 'express'
import u from 'url'
import c from '../config.js'
import f from './f.js'

export const proceed = null

export const notFound        = {status: 404, body: 'Not Found'}
export const unauthorized    = {status: 403, body: 'Forbidden'}
export const unauthenticated = {status: 401, body: 'Unauthorized'}
export const bad             = {status: 400, body: 'Bad Request'}
export const ok              = {status: 200, body: 'OK'}

export const json     = (data)        => ({json: data})
export const redirect = (target)      => ({redirect: target})
export const cookie   = (name, value) => ({cookie: [name, value]})
export const headers  = (data)        => ({headers: data})
export const body     = (data)        => ({body: data})

export const fullURL = (/* req */{protocol, headers: {host}}, pathname) =>
  u.format({protocol, host, pathname})

export const handler = (fn) => async (req, res, next) => {
  req.connection.setTimeout(5 * 60 * 1000)
  const r = await fn({...req.params, ...req.query},
                     req.files ?? req.body,
                     req)

  if (r == null) {
    next()
    return
  }

  if (r.cookie)   res.cookie(...r.cookie, {httpOnly: true, secure: !c.isDev})
  if (r.headers)  res.set(r.headers)
  if (r.redirect) res.redirect(r.redirect)
  if (r.status)   res.status(r.status)
  if (r.json)     res.json(r.json)
  if (r.body)     res.send(r.body)
}

export function register(app, path, routes, ...middlewares) {
  const router = express.Router()
  if (!f.empty(middlewares)) router.use(...middlewares)

  routes.map(
  ([verb, route, fn, ...middlewares]) =>
    router[verb](route, ...middlewares, handler(fn)))

  if (path != null) app.use(path, router)
  else app.use(router)
}
