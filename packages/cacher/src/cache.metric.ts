import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';
import { isNull } from 'lodash';
import { CacheType } from './cache.config';

export const TRACK_STATUS_CACHE_METRIC = 'track_status_cache_metric';

export enum CacheMethod {
  SET = 'SET',
  GET = 'GET',
  DEL = 'DEL',
}

export enum GetStatus {
  SUCCESS_HIT = 'SUCCESS_HIT',
  SUCCESS_MISS = 'SUCCESS_MISS',
  ERROR_GET_VALUE = 'ERROR',
}

export enum SetStatus {
  SUCCESS = 'SUCCESS',
  ERROR_SET_VALUE = 'ERROR',
}

export enum DelStatus {
  SUCCESS_HIT = 'SUCCESS',
  SUCCESS_MISS = 'SUCCESS_MISS',
  ERROR_DEL_VALUE = 'ERROR',
}

@Injectable()
export class CacheMetricService {
  constructor(@InjectMetric(TRACK_STATUS_CACHE_METRIC) private trackMetric: Counter<string>) {}

  track(
    type: CacheMethod,
    status: GetStatus | SetStatus | DelStatus,
    namespace: string,
    conId: string = DEFAULT_CON_ID,
  ) {
    this.trackMetric.inc({ type, status, namespace, conId });
  }
}

export const GetCacheMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, services } = options;
      const [key, namespace, type = CacheType.LOCAL, conId = DEFAULT_CON_ID] = args;
      const cacheMetricService: CacheMetricService = services.cacheMetricService;

      try {
        const value = await method(...args);
        services.pinoLogger.debug('`%s` %s cache lookup success %s = %s', conId, type, key, value);
        if (isNull(value)) {
          cacheMetricService.track(CacheMethod.GET, GetStatus.SUCCESS_MISS, namespace, conId);
          return value;
        }
        cacheMetricService.track(CacheMethod.GET, GetStatus.SUCCESS_HIT, namespace, conId);
        return value;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` %s cache failed to get cache by key `%s`', conId, type, key);
        cacheMetricService.track(CacheMethod.GET, GetStatus.ERROR_GET_VALUE, namespace, conId);
      }
    },
    [CacheMetricService],
  );
};

export const SetCacheMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, services } = options;
      const [key, value, namespace, type = CacheType.LOCAL, conId = DEFAULT_CON_ID] = args;
      const cacheMetricService: CacheMetricService = services.cacheMetricService;

      try {
        await method(...args);
        services.pinoLogger.debug(
          '`%s` %s cache set a cache is a success with key=%s, value=%s',
          conId,
          type,
          key,
          value,
        );
        cacheMetricService.track(CacheMethod.SET, SetStatus.SUCCESS, namespace, conId);
      } catch (error) {
        services.pinoLogger.error(
          error,
          '`%s` %s cache failed to set cache by key=%s, value=%s',
          conId,
          type,
          key,
          value,
        );
        cacheMetricService.track(CacheMethod.SET, SetStatus.ERROR_SET_VALUE, namespace, conId);
      }
    },
    [CacheMetricService],
  );
};

export const DelCacheMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, services } = options;
      const [key, namespace, type = CacheType.LOCAL, conId = DEFAULT_CON_ID] = args;
      const cacheMetricService: CacheMetricService = services.cacheMetricService;

      try {
        const value: boolean = await method(...args);
        services.pinoLogger.debug('`%s` %s cache delete success %s = %s', conId, type, key, value);
        if (isNull(value)) {
          cacheMetricService.track(CacheMethod.DEL, DelStatus.SUCCESS_MISS, namespace, conId);
          return value;
        }
        cacheMetricService.track(CacheMethod.DEL, DelStatus.SUCCESS_HIT, namespace, conId);
        return value;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` %s cache failed to delete cache by key `%s`', conId, type, key);
        cacheMetricService.track(CacheMethod.DEL, DelStatus.ERROR_DEL_VALUE, namespace, conId);
      }
    },
    [CacheMetricService],
  );
};
