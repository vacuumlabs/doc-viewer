import express from 'express'
import {expressHelpers, run} from 'yacol'
import c from './config'

const app = express()
const {register, runApp} = expressHelpers

function* hello(req, res) {
  res.send('Hello World!')
}

register(app, 'get', '/', hello)

run(function* () {
  run(runApp)
  app.listen(c.port, () =>
    console.log(`App started on localhost:${c.port}.`)
  )
})
