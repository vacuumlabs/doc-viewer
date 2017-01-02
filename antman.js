import {run} from 'yacol'
import parseArgs from 'minimist'
import {upload as _upload, link as _link} from './upload.js'
import {migrate as _migrate} from './migrate.js'

const usageUpload = 'yarn run antman -- upload [-a] host folder'
const usageMigrate = 'yarn run antman -- migrate -f from_url -t to_url'

function upload(args) {
  const host = args['_'][1]
  const folder = args['_'][2]

  if (!folder || !host) {
    console.log(`usage: ${usageUpload}`)
    process.exit(0)
  }

  run(function* () {
    const docId = yield run(_upload, host, folder)
    if (args.alias) {
      yield run(_link, host, folder, docId)
    }
  })
}

function migrate(args) {
  if (!(args.f && args.t)) {
    console.log(`usage: ${usageMigrate}`)
    process.exit(0)
  }

  run(function* () {
    yield run(_migrate, args.f, args.t)
  })
}

const args = parseArgs(process.argv.slice(2), {
  alias: {'alias': 'a', 'from': 'f', 'to': 't'},
  'boolean': ['alias'],
})

const command = args['_'][0]
const action = {upload, migrate}[command]

if (action) action(args)
else console.log(`usage: ${usageUpload}\n${usageMigrate}`)
