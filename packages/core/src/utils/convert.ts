import { isArray, isBoolean, isNaN, isNil, isPlainObject, isString } from 'lodash';
import pluralize from 'pluralize';
import slug from 'slug';

/**
 * Recursively flattens the keys of an object and returns an array of strings
 * that represent the flattened paths of each key.
 * @param {object} obj - The input object to flatten.
 * @param {string} currentPath - The current path of the input object being flattened.
 * @returns {string[]} An array of strings representing the flattened paths of each key.
 */
export function flattenKeys(obj: object, currentPath: string = null): string[] {
  let paths: string[] = [];

  for (const k in obj) {
    if (isPlainObject(obj[k]) || isArray(obj[k])) {
      paths = paths.concat(flattenKeys(obj[k], currentPath ? `${currentPath}.${k}` : k));
    } else {
      paths.push(currentPath ? `${currentPath}.${k}` : k);
    }
  }

  return paths;
}

/**
 * Converts a value to an integer. Returns the default value if the input value
 * is null, undefined, or cannot be converted to an integer.
 * @param {number|string|boolean} n - The value to convert to an integer.
 * @param {number} [def=0] - The default value to return if the input value is null or undefined.
 * @returns {number} The input value as an integer, or the default value if the input value cannot be converted to an integer.
 */
export function toInt(n: number | string | boolean, def: number = 0): number {
  if (isNil(n)) return def;
  if (isBoolean(n)) return n ? 1 : 0;
  if (n === 'true') return 1;
  if (n === 'false') return 0;
  if (typeof n === 'string' && isNaN(parseInt(n, 10))) return def;
  return n ? parseInt(String(n), 10) : def;
}

/**
 * Converts a value to a boolean.
 * @param {boolean|string|number|buffer} b - The value to convert.
 * @param {boolean} [def=false] - The default value to use if the input value is null, undefined, empty, or cannot be converted to a boolean.
 * @returns {boolean} The boolean value of the input.
 */
export function toBool(b: boolean | string | number | Buffer, def: boolean = false): boolean {
  if (isNil(b) || b === 0 || b === '') return def;
  if (b instanceof Buffer) {
    if (!b.length) return def;
    return b.length && b[0] === 1;
  }
  const value = String(b).toLowerCase();
  return value === 'yes' || value === 'true' || value === '1';
}

/**
 * Converts a value to an array.
 * @param {T | Array<T>} data - The value to convert.
 * @param {} opts - Options
 * @returns {Array<T>} An array containing the input value, or an empty array if the input is null, undefined, or an empty array.
 * @template T
 */
export function toArray<T>(data: T | Array<T>, opts?: { split: string | RegExp }): T[] {
  if (!data || (isArray(data) && !data.length)) return [];
  if (isString(data) && opts?.split) {
    return data.split(opts.split) as T[];
  }
  return isArray(data) ? data : [data];
}

/**
 * Transforms a link based on a specified host and type.
 * @param {string} link - The link to transform.
 * @param {string} host - The host to use for the transformation.
 * @param {'relative' | 'absolute'} type - The type of transformation to perform ('relative' or 'absolute').
 * @returns {string} The transformed link.
 */
export function linkTransform(link: string, host: string, type: 'relative' | 'absolute' = 'relative'): string {
  if (!link) return link;
  if (link && type === 'relative') return link.replace(host, '');
  if (link && type === 'absolute' && !link.startsWith('http')) return joinUrl(host, { paths: [link] });
  return link;
}

/**
 * Convert string to singular
 * @param {string} str
 * @returns {string}
 */
export function toSingular(str: string): string {
  return pluralize.singular(str);
}

/**
 * Convert string to plural
 * @param {string} str
 * @param {number} count
 * @returns {string}
 */
export function toPlural(str: string, count?: number): string {
  return isNil(count) ? pluralize.plural(str) : pluralize(str, count, true);
}

/**
 * Converts one or more strings into a slugified string.
 * @param {...string} values - The strings to be slugified.
 * @returns {string} The slugified string.
 */
export function toSlugify(...values: any[]): string {
  if (!values.length) return null;
  return slug(values.join(' '), { lower: true });
}

/**
 * Converts an object to a query string.
 * @param {Object} queryParameters - The object to be converted to a query string.
 * @returns {string} - The generated query string.
 */
export function objectToQueryString(queryParameters: { [key: string]: any }): string {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val], index) => {
        const symbol = queryString.length === 0 ? '?' : '&';
        queryString += `${symbol}${key}=${encodeURIComponent(val || '')}`;
        return queryString;
      }, '')
    : '';
}

/**
 * Combines a host with paths and parameters to create a valid URL string
 * @param {string} host - The base URL to use
 * @param {object} parts - An object containing paths and/or parameters to add to the URL
 * @param {string[]} parts.paths - An array of path segments to add to the URL
 * @param {object} parts.params - An object containing query parameters to add to the URL
 * @returns {string} A valid URL string
 */
export function joinUrl(host: string, parts?: { paths?: string[]; params?: object }): string {
  const { paths = [], params = {} } = parts || {};
  let result = [host, ...paths, objectToQueryString(params)]
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');
  if (result.slice(-1) === '/') {
    result = result.slice(0, -1);
  }
  return result;
}

/**
 * Recursively converts any key with the value "null" into null in a nested object.
 * @param {object} obj - The object to convert.
 * @returns {object} - The converted object.
 */
export function nullKeysToObject(obj: { [key: string]: any }): object {
  if (!obj) return {};
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = nullKeysToObject(obj[key]);
      } else {
        result[key] = obj[key] === 'null' ? null : obj[key];
      }
    }
  }

  return result;
}
