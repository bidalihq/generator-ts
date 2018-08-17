const debug = require('debug')('<%= name %>');

export default function init(): string {
  debug('Initializing <%= name %> module');
  return 'Hello <%= name %>';
}
