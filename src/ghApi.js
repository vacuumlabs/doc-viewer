import {run} from 'yacol'
import fetch from 'node-fetch'
import querystring from 'querystring'

const ghApiUrl = 'https://api.github.com'

const HttpNoContent = 204
const HttpUnauthorized = 401
const HttpNotFound = 404

export const errorUnauthorized = 'unauthorized'
export const errorUnsupportedHttpCode = 'unsupportedHttpCode'

function headers(token) {
  const h = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) h['Authorization'] = `token ${token}`
  return h
}

export function authorizeUrl(ghClient) {
  const url = 'https://github.com/login/oauth/authorize'
  const query = {
    scope: 'repo',
    client_id: ghClient.client_id,
  }
  return `${url}?${querystring.stringify(query)}`
}

export function* accessToken(ghClient, code) {
  const url = 'https://github.com/login/oauth/access_token'
  const authParams = {...ghClient, code, accept: 'json'}
  const authResult = yield fetch(url, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(authParams),
  })

  return (yield authResult.json()).access_token
}


function* get(token, url) {
  const response = yield fetch(url, {
    headers: headers(token),
    method: "GET",
  })

  if (response.status === HttpUnauthorized) throw {error: errorUnauthorized}

  return response
}

export function* user(token) {
  const url = `${ghApiUrl}/user`
  return yield (yield run(get, token, url)).json()
}

export function* amICollaborator(token, organization, repo) {
  const {login} = yield run(user, token)
  const url = `${ghApiUrl}/repos/${organization}/${repo}/collaborators/${login}`
  const response = yield run(get, token, url)

  if (response.status === HttpNoContent) return true
  if (response.status === HttpNotFound) return false

  // Unsupported HTTP code
  throw {error: errorUnsupportedHttpCode, code: response.status}
}
