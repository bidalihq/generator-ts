import Debug from 'debug';

const debug = Debug('<%= name %>');

export default function init(): string {
  debug('Initializing <%= name %> module');
  return 'Hello <%= name %>';
}
