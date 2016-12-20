import archiver from 'archiver'
import fs from 'mz/fs'
import path from 'path'

function upload(folder) {
  const output = fs.createWriteStream(path.join(__dirname, 'example.zip'))
  const archive = archiver('zip')
  archive.pipe(output)
  archive.glob('**/*', {dot: true, cwd: folder})
  archive.finalize()
}

const folder = process.argv[2]

if (!folder) {
  console.log(`Usage: yarn run upload <folder-to-upload>`)
  process.exit(0)
}
upload(process.argv[2])
