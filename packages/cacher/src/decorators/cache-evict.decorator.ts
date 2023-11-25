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

      try {
        await cacheService.del(cacheKey, { namespace }, conId);
        services.pinoLogger.debug('`%s` Cache eviction for [%s] successfully removed.', conId, cacheKey);
        return method(...args);
      } catch (error) {
        const errMsg: string = '`%s` Cache strategy error: An error occurred during the automated process for [%s].';
        services.pinoLogger.error(error, errMsg, conId, cacheKey);
        return null;
      }
    },
    [CacheService],
  );
};
