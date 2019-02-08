import assert from 'assert';
import plugin from '../src';

describe('<%= name %>', () => {
  it('basic functionality', async () => {
    assert.equal(typeof plugin, 'function');
    assert.equal(plugin(), 'Hello <%= name %>');
  });
});
