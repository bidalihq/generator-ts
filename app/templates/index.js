const debug = require('debug')('<%= name %>');

export default function init() {
  debug('Initializing <%= name %> module');
  return 'Hello <%= name %>';
}
