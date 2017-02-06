import {assert} from 'chai';
import {Reader, Writer} from '../helpers/streams';
import Transform from '../../src/transform';

suite('transform', () => {
  test('that good events are transformed', (done) => {
    const transform = new Transform();
    const writer = new Writer();
    const reader = new Reader();

    reader.pipe(transform).pipe(writer);

    reader.push({});
    reader.push(null);

    reader.once('end', () => {
      assert.equal(writer.data[0], JSON.stringify({}));

      done();
    });
  });
});
