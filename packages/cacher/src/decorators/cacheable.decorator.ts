import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  DEFAULT_CON_ID,
  Entity,
  Reflector,
  SetMetadata,
  plainToInstance,
} from '@joktec/core';
import { CacheService } from '../cache.service';
import { generateCacheKey } from '../cache.utils';
import { CacheableProps } from '../interceptors';
import { CACHEABLE_WATERMARK, CacheableOption, CacheTtlSeconds } from '../models';

export const Cacheable = <T = Entity>(namespace: string, cacheableOptions?: CacheableOption): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services, params } = options;
      const { key, expiry = CacheTtlSeconds.ONE_MINUTE, conId = DEFAULT_CON_ID, transform } = cacheableOptions || {};

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

      const cachedValue: T = await cacheService.get<T>(cacheKey, { namespace }, conId);
      if (cachedValue) {
        return transform ? plainToInstance(transform, cachedValue) : cachedValue;
      }

      const valueToCache: T = await method(...args);
      await cacheService.set<T>(cacheKey, valueToCache, { namespace, expiry }, conId);
      return transform ? plainToInstance(transform, valueToCache) : valueToCache;
    },
    [CacheService, Reflector],
  );
};
