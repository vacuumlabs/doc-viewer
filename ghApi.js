import {run} from 'yacol'
import fetch from 'node-fetch'

const ghApiUrl = 'https://api.github.com'

function headers(token) {
  return {
    'Accept': 'application/json',
    'Authorization': `token ${token}`,
    'Content-Type': 'application/json',
  }
}

function get(token, url) {
  return fetch(url, {
    headers: headers(token),
    method: "GET",
  })
}

export function* user(token) {
  const url = `${ghApiUrl}/user`
  const response = yield get(token, url)
  return yield response.json()
}

export function* amICollaborator(token, organization, repo) {
  const {login} = yield run(user, token)
  const url = `${ghApiUrl}/repos/${organization}/${repo}/collaborators/${login}`
  const response = yield get(token, url)
  return response.status === 204
}
