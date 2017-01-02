import http from 'http'
import https from 'https'
import _url from 'url'
import p from 'path'

export default function request(url, options) {
  const {protocol, hostname: host, port, path: _path} = _url.parse(url)
  const path = options.path ? p.join(_path, options.path) : _path
  const headers = {'Authorization': options.apiKey}

  const requestFn = {'http:': http.request, 'https:': https.request}[protocol]
  if (requestFn === undefined) throw new Error(`Invalid protocol ${protocol}`)

  let res, rej
  const response = new Promise((_res, _rej) => [res, rej] = [_res, _rej])
  const request = requestFn({...options, host, port, path, headers}, res)

  return [request, response]
}
