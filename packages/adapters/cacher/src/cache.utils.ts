import { get, has, isEmpty } from 'lodash';
import hash from 'object-hash';

function hashKey(data: any): string {
  return hash({ data }, { unorderedArrays: true, algorithm: 'md5' });
}

export function generateCacheKey(data: { method: string; params?: any; key?: string }): string {
  const { key, method, params = {} } = data;
  if (isEmpty(params)) return method;
  if (!key || !has(params, key)) return hashKey(params);
  return hashKey(get(params, key));
}

function regExpEscape(s: string): string {
  return s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

export function wildcardToRegExp(s: string): RegExp {
  return new RegExp('^' + s.split(/[*?]/).map(regExpEscape).join('.*') + '$');
}
