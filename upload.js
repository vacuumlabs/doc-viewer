import archiver from 'archiver'
import fs from 'mz/fs'
import path from 'path'
import {run} from 'yacol'

function* ignore(folder) {
  const ignoreFile = path.join(folder, '.docsignore')
  const parse = (f) => f.split('\n')
      .map((s) => s.trim())
      .filter((s) => !s.match(/^#/) && s !== '')

  return (yield fs.stat(ignoreFile)).isFile()
      ? parse(yield fs.readFile(ignoreFile, 'utf-8'))
      : []
}

function* upload(folder) {
  const output = fs.createWriteStream(path.join(__dirname, 'example.zip'))
  const archive = archiver('zip')
  archive.pipe(output)
  archive.glob('**/*', {
    dot: true,
    cwd: folder,
    ignore: yield run(ignore, folder)
  })
  archive.finalize()
}

const folder = process.argv[2]

if (!folder) {
  console.log(`Usage: yarn run upload <folder-to-upload>`)
  process.exit(0)
}
run(upload, process.argv[2])
