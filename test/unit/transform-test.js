import {assert} from 'chai';
import any from '@travi/any';
import {Reader, Writer} from '../helpers/streams';
import Transform from '../../src/transform';

suite('transform', () => {
  let writer, reader, transform;

  const method = any.fromList(['get', 'post', 'put', 'delete']);
  const path = any.string();
  const tags = any.listOf(any.word);
  const tagsAsObject = tags.reduce((acc, tag) => ({...acc, [tag]: true}), {});

  setup(() => {
    writer = new Writer();
    reader = new Reader();
    transform = new Transform();

    reader.pipe(transform).pipe(writer);
  });

  test('that RequestLog events are transformed', (done) => {
    const event = 'request';
    const data = any.string();

    reader.push({
      event,
      tags,
      data,
      id: any.string(),
      method,
      path
    });
    reader.push(null);

    reader.once('end', () => {
      assert.equal(writer.data[0], JSON.stringify({
        labels: tagsAsObject,
        message: data,
        context: {
          httpRequest: {
            requestMethod: method,
            requestUrl: path
          }
        }
      }));

      done();
    });
  });

  test('that RequestLog events containing Error objects are transformed', (done) => {
    const event = 'request';
    const data = new Error('from test');

    reader.push({
      event,
      tags,
      data,
      id: any.string(),
      method,
      path
    });
    reader.push(null);

    reader.once('end', () => {
      assert.equal(writer.data[0], JSON.stringify({
        labels: tagsAsObject,
        message: data.stack,
        context: {
          httpRequest: {
            requestMethod: method,
            requestUrl: path
          }
        }
      }));

      done();
    });
  });
});
