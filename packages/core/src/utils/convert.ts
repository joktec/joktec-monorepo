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
  if (!b) return def;
  if (b instanceof Buffer) return b.length && b[0] === 1;
  const value = String(b).toLowerCase();
  return value === 'yes' || value === 'true' || value === '1';
};

export const toArray = <T>(data: T | Array<T>, separator?: string): T[] => {
  if (!data) return [];
  if (isString(data) && separator) {
    return data.split(separator) as Array<T>;
  }
  return isArray(data) ? data : [data];
};

export const linkTransform = (link: string, host: string, type: 'relative' | 'absolute' = 'relative'): string => {
  if (link && type === 'relative') return link.replace(host, '');
  if (link && type === 'absolute' && !link.startsWith('http')) return new URL(link, host).toString();
  return link;
};

export const toSingular = (str: string): string => pluralize.singular(str);

export const toPlural = (str: string, count?: number): string =>
  isNil(count) ? pluralize.plural(str) : pluralize(str, count, true);

export const toSlugify = (...values: string[]): string => {
  if (!values.length) return null;
  return slug(values.join(' '), { lower: true });
};
