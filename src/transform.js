import stream from 'stream';

function format(data) {
  if (data instanceof Error) {
    return data.stack;
  }

  return data;
}

export default class extends stream.Transform {
  constructor(config) {
    super({objectMode: true});
  }

  _transform({data, method, path, event, tags}, enc, next) {
    const message = format(data);

    next(null, JSON.stringify({
      labels: tags.reduce((acc, tag) => ({...acc, [tag]: true}), {}),
      message,
      context: {
        httpRequest: {
          requestMethod: method,
          requestUrl: path
        }
      }
    }));
  }
}
