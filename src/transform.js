import stream from 'stream';

export default class extends stream.Transform {
  constructor(config) {
    super({objectMode: true});
  }

  _transform(data, enc, next) {
    next(null, JSON.stringify({}));
  }
}
