import hash from 'object-hash';
import dot from 'dot-object';
import { CacheKey } from './cache.config';
import { isEmpty } from 'lodash';

export const generateCacheKey = (key: 'params' | CacheKey, methodName: string, params: any): string => {
  if (isEmpty(params)) return methodName;
  if (key === 'params') return hash(params, { unorderedArrays: true });
  if (!key.match(/#.*(\..*)/)) return methodName;
  return dot.pick(key.replace('#', ''), params);
};
