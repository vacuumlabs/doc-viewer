import {exec} from 'child_process'
import fs from 'fs'

export function init(name) {
  const initRepo = 'git@github.com:vacuumlabs/init-handbook.git'
  if (fs.existsSync(name)) {
    console.error(`Directory ${name} already exists.`)
    process.exit(1)
  }
  exec(`git clone --depth=1 --branch=master ${initRepo} ${name} && rm -rf ${name}/.git && git init ${name}`)
}
