import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  DEFAULT_CON_ID,
  Entity,
  Reflector,
  SetMetadata,
} from '@joktec/core';
import { CacheService } from '../cache.service';
import { generateCacheKey } from '../cache.utils';
import { CacheableProps } from '../interceptors';
import { CACHEABLE_WATERMARK, CacheableOption, CacheTtlSeconds } from '../models';

export const Cacheable = <T = Entity>(namespace: string, cacheableOptions?: CacheableOption): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services, params } = options;
      const { key, expiry = CacheTtlSeconds.ONE_MINUTE, conId = DEFAULT_CON_ID } = cacheableOptions || {};

      const reflector: Reflector = services.reflector;
      const cacheService: CacheService = services.cacheService;
      const cacheKey = generateCacheKey({ method: method.name, key, params });

      // TODO: Researching...
      // Set metadata and switch to use Interceptor for Controller
      const { target, propertyKey, descriptor } = options;
      const isController = reflector.get<boolean>('__controller__', target.constructor);
      if (isController) {
        const metadata = { cacheKey, namespace, expiry, conId };
        SetMetadata<string, CacheableProps>(CACHEABLE_WATERMARK, metadata)(target, propertyKey, descriptor);
        // UseInterceptors(CacheableInterceptor);
        // return;
      }

      try {
        const cachedValue: T = await cacheService.get<T>(cacheKey, { namespace }, conId);
        if (cachedValue) {
          services.pinoLogger.debug('`%s` Cache hit for [%s] successfully retrieved.', conId, cacheKey);
          return cachedValue;
        }

        const valueToCache: T = await method(...args);
        await cacheService.set<T>(cacheKey, valueToCache, { namespace, expiry }, conId);
        services.pinoLogger.debug('`%s` Cache store for [%s] successfully cached.', conId, cacheKey);
        return valueToCache;
      } catch (error) {
        const errMsg: string = '`%s` Cache strategy error: An error occurred during the automated process for [%s].';
        services.pinoLogger.error(error, errMsg, conId, cacheKey);
        return null;
      }
    },
    [CacheService, Reflector],
  );
};
