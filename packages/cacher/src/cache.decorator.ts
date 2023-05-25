import { BaseMethodDecorator, CallbackDecoratorOptions } from '@joktec/core';
import { CacheableOption, CacheEvictOption } from './cache.config';
import { defaultCacheableOptions, defaultCacheEvictOptions, generateCacheKey } from './cache.utils';
import { CacheService } from './cache.service';

export const Cacheable = <T>(namespace: string, cacheableOptions?: CacheableOption): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackDecoratorOptions): Promise<T> => {
      const { method, args, services, params } = options;
      const { key, expiry, conId } = { ...defaultCacheableOptions, ...cacheableOptions };
      const cacheService: CacheService = services.cacheService;

      try {
        const cacheKey = generateCacheKey(key, method.name, params);
        const cachedValue: T = await cacheService.get<T>(cacheKey, namespace, conId);
        if (cachedValue) {
          services.pinoLogger.debug('`%s` Result from cacheable key `%s` success', conId, key);
          return cachedValue;
        }

        const valueToCache: T = await method(...args);
        await cacheService.set(cacheKey, valueToCache, namespace, expiry, conId);
        services.pinoLogger.debug('`%s` Cacheable key `%s` success', conId, key);
        return valueToCache;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` Cacheable key `%s` failed', conId, key);
        return null;
      }
    },
    [CacheService],
  );
};

export const CachePut = <T>(namespace: string, cacheableOptions?: CacheableOption): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackDecoratorOptions): Promise<any> => {
      const { method, args, services, params } = options;
      const { key, expiry, conId } = { ...defaultCacheableOptions, ...cacheableOptions };
      const cacheService: CacheService = services.cacheService;

      try {
        const cacheKey = generateCacheKey(key, method.name, params);
        const valueToCache = await method(...args);
        await cacheService.set(cacheKey, valueToCache, namespace, expiry, conId);
        services.pinoLogger.debug('`%s` CachePut key `%s` success', conId, key);
        return valueToCache;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` CachePut key `%s` failed', conId, key);
        return null;
      }
    },
    [CacheService],
  );
};

export const CacheEvict = <T>(namespace: string, cacheEvictOption?: CacheEvictOption): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackDecoratorOptions): Promise<any> => {
      const { method, args, services, params } = options;
      const { key, allEntries, conId } = { ...defaultCacheEvictOptions, ...cacheEvictOption };
      const cacheService: CacheService = services.cacheService;

      try {
        const cacheKey = generateCacheKey(key, method.name, params);
        const returnValue = await method(...args);

        if (allEntries) {
          await cacheService.delWildcard(namespace, conId);
          services.pinoLogger.debug('`%s` CacheEvict all key in namespace `%s` success', conId, namespace);
        } else {
          await cacheService.del(cacheKey, namespace, conId);
          services.pinoLogger.debug('`%s` CacheEvict key `%s` success', conId, key);
        }

        return returnValue;
      } catch (error) {
        if (allEntries) {
          services.pinoLogger.error(error, '`%s` CacheEvict all key in namespace `%s` failed', conId, namespace);
        } else {
          services.pinoLogger.error(error, '`%s` CacheEvict key `%s` failed', conId, key);
        }
        return null;
      }
    },
    [CacheService],
  );
};
