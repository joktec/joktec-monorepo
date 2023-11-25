import { ICacheStrategy, toBool, toInt } from '@joktec/core';
import { Cacheable, CacheEvict, CachePut } from './decorators';
import { CacheableOption, CacheEvictOption, CacheTtlSeconds } from './models';

export const CacheStrategy = (
  namespace: string,
  opts?: CacheableOption & CacheEvictOption & { enable?: boolean },
): ICacheStrategy => {
  const enable = toBool(opts?.enable, true);
  if (!enable) return {};

  const cacheableOption: CacheableOption = {
    ...opts,
    expiry: toInt(opts?.expiry, CacheTtlSeconds.ONE_MINUTE),
  };

  const cacheEvictOption: CacheEvictOption = {
    ...opts,
    allEntries: toBool(opts?.allEntries, true),
  };

  return {
    paginate: Cacheable(namespace, cacheableOption),
    detail: Cacheable(namespace, cacheableOption),
    update: CachePut(namespace, cacheableOption),
    delete: CacheEvict(namespace, cacheEvictOption),
  } as ICacheStrategy;
};
