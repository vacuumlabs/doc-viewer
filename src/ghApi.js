import {run} from 'yacol'
import fetch from 'node-fetch'
import {unauthorized} from './exceptions.js'
import c from './config'

const ghApiUrl = `${c.ssoUrl}/api/github`

function headers(token) {
  const h = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) h['Authorization'] = `${c.ssoKey} ${token}`
  return h
}

function* get(token, url) {
  if (token == null) throw unauthorized

  const response = yield fetch(url, {
    headers: headers(token),
    method: "GET",
  })

  if (response.status === 401) throw unauthorized

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

  if (response.status === 204) return true
  if (response.status === 404) return false

  // Unsupported HTTP code
  throw new Error(`Github returned unsupported HTTP code ${response.status}.`)
}
