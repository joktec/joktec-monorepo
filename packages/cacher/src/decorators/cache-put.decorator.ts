import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID, Entity } from '@joktec/core';
import { CacheService } from '../cache.service';
import { generateCacheKey } from '../cache.utils';
import { CacheableOption, CacheTtlSeconds } from '../models';

export const CachePut = <T = Entity>(namespace: string, cacheableOptions?: CacheableOption): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, services, params } = options;
      const { key, expiry = CacheTtlSeconds.ONE_MINUTE, conId = DEFAULT_CON_ID } = cacheableOptions || {};
      const cacheService: CacheService = services.cacheService;
      const cacheKey = generateCacheKey({ method: method.name, key, params });

      try {
        const valueToCache = await method(...args);
        await cacheService.set<T>(cacheKey, valueToCache, { namespace, expiry }, conId);
        return valueToCache;
      } catch (error) {
        return null;
      }
    },
    [CacheService],
  );
};
