import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { CacheService } from '../cache.service';
import { generateCacheKey } from '../cache.utils';
import { CacheEvictOption } from '../models';

export const CacheEvict = (namespace: string, cacheEvictOption?: CacheEvictOption): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, services, params } = options;
      const { key, allEntries = false, conId = DEFAULT_CON_ID } = cacheEvictOption || {};
      const cacheService: CacheService = services.cacheService;

      const cacheKey = allEntries ? '*' : generateCacheKey({ method: method.name, key, params });
      const res = await method(...args);
      await cacheService.del(cacheKey, { namespace }, conId);

      return res;
    },
    [CacheService],
  );
};
