import stream from 'stream';

export default class extends stream.Transform {
  constructor(config) {
    super({objectMode: true})
  }
}
