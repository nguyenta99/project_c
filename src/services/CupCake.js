import { DirectUpload } from '@rails/activestorage'
import config from 'config'

const client = {
  baseURL: config.cupCakeHost,
}

export class FileUploader {
  constructor(client, api='api/v1/direct_uploads') {
    this.client = client
    this.api = api
  }

  upload = ({ file, params, done, error, progress }) => {
    this.progress = progress

    let query = Object.keys(params || {}).map((key) =>
      [key, params[key]].join('=')
    ).join('&')

    const url = `${this.client.baseURL}/${this.api}?${query}`

    const uploader = new DirectUpload(file, url, this)

    uploader.create((err, blob) => {
      if (err) {
        if (error) error(err)
      } else {
        if (done) done(blob)
      }
    })
  }

  directUploadWillCreateBlobWithXHR(request) {
  }

  directUploadWillStoreFileWithXHR(request) {
    request.upload.addEventListener("progress",
      event => this.directUploadDidProgress(event))
  }

  directUploadDidProgress(event) {
    // Use event.loaded and event.total to update the progress bar
    // console.log('progress', event.loaded, event.total)
    if (this.progress) this.progress(event.loaded, event.total)
  }
}

client.uploadFile = (args) => {
  const fileUploader = new FileUploader(client)
  fileUploader.upload(args)
}

export default client