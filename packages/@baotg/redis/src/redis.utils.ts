import { DEFAULT_CON_ID } from '@baotg/core';
import hash from 'object-hash';
import dot from 'dot-object';
import { CacheableOption, CacheEvictOption, CacheKey } from './redis.config';
import { isEmpty } from 'lodash';

export const generateCacheKey = (key: 'params' | CacheKey, methodName: string, params: any): string => {
  if (isEmpty(params)) return methodName;
  if (key === 'params') return hash(params, { unorderedArrays: true });
  if (!key.match(/#.*(\..*)/)) return methodName;
  return dot.pick(key.replace('#', ''), params);
};

export enum CacheTtlSeconds {
  FOREVER = 0,
  ONE_MINUTE = 60,
  ONE_HOUR = 60 * 60,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 7 * 24 * 60 * 60,
}

export const defaultCacheableOptions: CacheableOption = {
  key: 'params',
  expiry: CacheTtlSeconds.FOREVER,
  conId: DEFAULT_CON_ID,
};

export const defaultCacheEvictOptions: CacheEvictOption = {
  key: 'params',
  allEntries: false,
  conId: DEFAULT_CON_ID,
};
