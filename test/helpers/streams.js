import stream from 'stream';

export class Writer extends stream.Writable {
  constructor() {

    super({ objectMode: true });
    this.data = [];
  }
  _write(chunk, enc, callback) {

    this.data.push(chunk);
    callback(null);
  }
}

export class Reader extends stream.Readable {
  constructor() {

    super({ objectMode: true });
  }
  _read() {}
}
