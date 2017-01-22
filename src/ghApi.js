import {run} from 'yacol'
import fetch from 'node-fetch'

const ghApiUrl = 'https://api.github.com'

const HttpNoContent = 204
const HttpUnauthorized = 401
const HttpNotFound = 404

export const errorUnauthorized = 'unauthorized'
export const errorUnsupportedHttpCode = 'unsupportedHttpCode'

function headers(token) {
  return {
    'Accept': 'application/json',
    'Authorization': `token ${token}`,
    'Content-Type': 'application/json',
  }
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
