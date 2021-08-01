import axios from 'axios'
import c from './config.js'
import * as http from './utils/http.js'
import f from './utils/f.js'
import qs from 'querystring'

const headers = (token) => ({headers: {Authorization: `${c.ssoKey} ${token}`}})

const api = async (path, token) =>
  (await axios.get(`${c.ssoUrl}/api${path}`, headers(token))).data

const me = (g) => `/me?${qs.stringify({groups: g})}`

const groups = async (g, token) => (await api(me(g), token)).groups

const inGroups = async (g = [], token) =>
  f.empty(g) || !f.empty(await groups(g, token))

const loginUrl = (url) =>
  `${c.ssoUrl}/$login?${qs.stringify({url, scopes: ''})}`

const login = (callbackPathname) => (params, body, req) =>
  http.redirect(loginUrl(http.fullURL(req, callbackPathname), ''))

const callback = ({code}, body, {cookies: {redirectAfterLogin = '/'}}) =>
    ({...http.cookie('authToken', code),
      ...http.redirect(redirectAfterLogin)})

const unauthenticated = (req) => ({
  ...http.redirect('/$auth/login'),
  ...http.cookie('redirectAfterLogin', req.url)})

export const authorize = http.handler((params, body, req) => {
  const token = req.cookies.authToken

  return f.try(async () =>
    ( c.disableAuth                     ? http.proceed
    : !token                            ? unauthenticated(req)
    : await inGroups(req.groups, token) ? http.proceed
    :                                     http.unauthorized),

    [[(e) => e.response?.status === 401, () => unauthenticated(req)]],
  )
})

export const routes =
[['get', '/login'   , login('/$auth/callback')],
 ['get', '/callback', callback]]
