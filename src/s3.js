import os from 'os'
import unzipper from 'unzipper'
import s3 from '@faceleg/s3'
import S3FS from 's3fs'
import p from 'path'
import {uuid} from './id.js'

export default function createClient(options) {
  const s3fsClient = new S3FS(options.bucket, {
    region: options.region,
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey,
  })

  const s3Client = s3.createClient({
    s3Options: {
      region: options.region,
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
    },
  })

  function* readFile(file) {
    return yield s3fsClient.readFile(file)
  }

  function* writeFile(file, data) {
    return yield s3fsClient.writeFile(file, data)
  }

  function* unzip(stream, path) {
    const tmpId = uuid()
    const tmpFolder = p.join(os.tmpdir(), tmpId)

    const extract = unzipper.Extract({path: tmpFolder})
    stream.pipe(extract)

    return yield new Promise((resolve, reject) =>
      extract.on('close', () => {
        const uploader = s3Client.uploadDir({
          localDir: tmpFolder,
          deleteRemoved: true,
          s3Params: {Bucket: options.bucket, Prefix: path},
        })
        uploader.on('error', (e) => reject(e))
        uploader.on('end', () => resolve())
      }),
    )
  }

  return {
    readFile,
    writeFile,
    unzip,
  }
}
