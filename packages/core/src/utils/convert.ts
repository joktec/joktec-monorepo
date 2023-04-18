import { isArray, isBoolean, isNaN, isNil, isPlainObject, isString } from 'lodash';
import pluralize from 'pluralize';
import slug from 'slug';

// Object
export const flattenKeys = (obj: object, currentPath: string | null): string[] => {
  let paths: string[] = [];

  for (const k in obj) {
    if (isPlainObject(obj[k]) || isArray(obj[k])) {
      paths = paths.concat(flattenKeys(obj[k], currentPath ? `${currentPath}.${k}` : k));
    } else {
      paths.push(currentPath ? `${currentPath}.${k}` : k);
    }
  }

  return paths;
};

export const toInt = (n: number | string | boolean, def: number = 0): number => {
  if (isNil(n)) return def;
  if (typeof n === 'string' && isNaN(parseInt(n, 10))) return def;
  if (isBoolean(n)) return n ? 1 : 0;
  if (n === 'true') return 1;
  if (n === 'false') return 0;
  return n ? parseInt(String(n), 10) : def;
};

export const toBool = (b: boolean | string | number | Buffer, def: boolean = false) => {
  if (isNil(b) || b === 0 || b === '') return def;
  if (b instanceof Buffer) {
    if (!b.length) return def;
    return b.length && b[0] === 1;
  }
  const value = String(b).toLowerCase();
  return value === 'yes' || value === 'true' || value === '1';
};

export const toArray = <T>(data: T | Array<T>): T[] => {
  if (!data || (isArray(data) && !data.length)) return [];
  return isArray(data) ? data : [data];
};

export const linkTransform = (link: string, host: string, type: 'relative' | 'absolute' = 'relative'): string => {
  if (link && type === 'relative') return link.replace(host, '');
  if (link && type === 'absolute' && !link.startsWith('http')) return joinUrl(host, { paths: [link] });
  return link;
};

export const toSingular = (str: string): string => pluralize.singular(str);

export const toPlural = (str: string, count?: number): string =>
  isNil(count) ? pluralize.plural(str) : pluralize(str, count, true);

export const toSlugify = (...values: string[]): string => {
  if (!values.length) return null;
  return slug(values.join(' '), { lower: true });
};

export const joinUrl = (host: string, parts?: { paths?: string[]; params?: object }): string => {
  const { paths, params } = parts;
  return [host, ...paths, objectToQueryString(params)]
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');
};

export const objectToQueryString = (queryParameters: { [key: string]: any }) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val], index) => {
        const symbol = queryString.length === 0 ? '?' : '&';
        queryString += val ? `${symbol}${key}=${val}` : '';
        return queryString;
      }, '')
    : '';
};
