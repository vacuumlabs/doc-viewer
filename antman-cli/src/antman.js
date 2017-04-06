import {run} from 'yacol'
import parseArgs from 'minimist'
import {upload as _upload, link as _link} from './upload.js'
import {migrate as _migrate} from './migrate.js'
import {init as _init} from './init.js'

const usageUpload = 'antman upload [-a] -k api_key host folder'
const usageMigrate = 'antman migrate -k api_key -f from_url -t to_url'
const usageInit = 'antman init name'

function upload(args) {
  const host = args['_'][1]
  const folder = args['_'][2]

  if (!(folder && host && args.k)) {
    console.log(`usage: ${usageUpload}`)
    process.exit(0)
  }

  run(function* () {
    const docId = yield run(_upload, args.k, host, folder)
    if (args.alias) {
      yield run(_link, args.k, host, folder, docId)
    }
  })
}

function migrate(args) {
  if (!(args.f && args.t && args.k)) {
    console.log(`usage: ${usageMigrate}`)
    process.exit(0)
  }

  run(function* () {
    yield run(_migrate, args.k, args.f, args.t)
  })
}

function init(args) {
  const name = args['_'][1]
  if (!name) {
    console.log(`usage: ${usageInit}`)
    process.exit(0)
  }
  _init(name)
}

const args = parseArgs(process.argv.slice(2), {
  alias: {'alias': 'a', 'from': 'f', 'to': 't', 'api-key': 'k'},
  'boolean': ['alias'],
})

const command = args['_'][0]
const action = {upload, migrate, init}[command]

if (action) action(args)
else console.log(`usage: ${usageUpload}\n${usageMigrate}\n${usageInit}`)
