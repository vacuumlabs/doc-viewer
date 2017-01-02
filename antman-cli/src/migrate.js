import {run} from 'yacol'
import request from './request.js'

function error(url, result) {
  if (result.statusCode !== 200) {
    throw new Error(`Server ${url} returned: HTTP ${result.statusCode}`)
  }
}

export function *migrate(apiKey, from, to) {
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
