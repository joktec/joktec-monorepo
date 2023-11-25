import { get, has, isEmpty } from 'lodash';
import hash from 'object-hash';

const hashKey = (data: any): string => hash({ data }, { unorderedArrays: true, algorithm: 'md5' });

export const generateCacheKey = (data: { method: string; params?: any; key?: string }): string => {
  const { key, method, params = {} } = data;
  if (isEmpty(params)) return method;
  if (!key || !has(params, key)) return hashKey(params);
  return hashKey(get(params, key));
};
