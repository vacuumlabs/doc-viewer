import p from 'path'
import {run} from 'yacol'
import url from 'url'
import http from 'http'
import https from 'https'
import parseArgs from 'minimist'
import transenv from 'transenv'

const apiKey = transenv()(({str}) => str('API_KEY'))

function request(u, subPath, method) {
  const {protocol, hostname, port, path} = url.parse(u)
  const headers = {'Authorization': apiKey}
  const requestFn = {'http:': http.request, 'https:': https.request}[protocol]
  if (requestFn === undefined) throw new Error(`Invalid protocol ${protocol}`)

  let resolve, reject

  const response = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  const request = requestFn({
    host: hostname,
    port,
    path: p.join(path, subPath),
    headers,
    method
  }, resolve)

  return {request, response}
}

function error(url, result) {
  if (result.statusCode !== 200) {
    throw new Error(`Server ${url} returned: HTTP ${result.statusCode}`)
  }
}

function *migrate(from, to) {
  const backup = request(from, '$backup', 'GET')
  const restore = request(to, '$restore', 'PUT')

  backup.request.end()
  const bResponse = yield backup.response
  bResponse.pipe(restore.request)
  bResponse.on('end', () => restore.request.end())

  error(from, bResponse)
  error(from, yield restore.response)

  console.log(`Succesfully migrated from ${from} to ${to}`)
}

const args = parseArgs(process.argv.slice(2), {
  alias: {'from': 'f', 'to': 't'},
})

if (!(args.f && args.t)) {
  console.log('usage: yarn run migrate -- -f from_url -t to_url')
  process.exit(0)
}

run(function* () {
  yield run(migrate, args.f, args.t)
})
