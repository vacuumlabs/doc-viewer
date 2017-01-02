import {run} from 'yacol'
import parseArgs from 'minimist'
import transenv from 'transenv'
import request from './request.js'

const apiKey = transenv()(({str}) => str('API_KEY'))

function error(url, result) {
  if (result.statusCode !== 200) {
    throw new Error(`Server ${url} returned: HTTP ${result.statusCode}`)
  }
}

function *migrate(from, to) {
  const [breq, bres] = request(from, {path: '$backup', method: 'GET', apiKey})
  const [rreq, rres] = request(to, {path: '$restore', method: 'PUT', apiKey})

  breq.end()
  const bResponse = yield bres
  bResponse.pipe(rreq)
  bResponse.on('end', () => rreq.end())

  error(from, bResponse)
  error(from, yield rres)

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
