import assert from 'assert';
import plugin from '../src';

describe('<%= name %>', () => {
  test('basic functionality', async () => {
    assert.equal(typeof plugin, 'function');
    assert.equal(plugin(), 'Hello <%= name %>');
  });
});
