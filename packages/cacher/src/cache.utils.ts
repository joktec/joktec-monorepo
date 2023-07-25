import { get, isArray, isEmpty, isObject } from 'lodash';
import hash from 'object-hash';

export const generateCacheKey = (key: 'auto' | string, methodName: string, params: object): string => {
  if (isEmpty(params)) return methodName;
  if (key === 'auto') return hash(params, { unorderedArrays: true });
  const value = get(params, key);
  if (isObject(value) || isArray(value)) return hash(value, { unorderedArrays: true });
  return String(value);
};
