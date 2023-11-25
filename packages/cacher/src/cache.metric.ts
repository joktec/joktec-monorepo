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
      const [key, namespace, conId = DEFAULT_CON_ID] = args;

      services.pinoLogger.setContext(CacheMetricService.name);
      const cacheMetricService: CacheMetricService = services.cacheMetricService;

      try {
        const value = await method(...args);

        if (isNull(value)) {
          services.pinoLogger.debug('`%s` Cache miss for [%s].', conId, key);
          cacheMetricService.track(CacheMethod.GET, GetStatus.SUCCESS_MISS, namespace, conId);
          return value;
        }

        services.pinoLogger.debug('`%s` Cache hit for [%s] successfully retrieved.', conId, key);
        cacheMetricService.track(CacheMethod.GET, GetStatus.SUCCESS_HIT, namespace, conId);
        return value;
      } catch (error) {
        const errMsg: string = '`%s` Cache hit for [%s] has an error occurred.';
        services.pinoLogger.error(error, errMsg, conId, key);
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

      services.pinoLogger.setContext(CacheMetricService.name);
      const cacheMetricService: CacheMetricService = services.cacheMetricService;

      try {
        await method(...args);
        services.pinoLogger.debug('`%s` Cache store for [%s] successfully cached.', conId, key);
        cacheMetricService.track(CacheMethod.SET, SetStatus.SUCCESS, namespace, conId);
      } catch (error) {
        const errMsg: string = '`%s` Cache store for [%s] has an error occurred.';
        services.pinoLogger.error(error, errMsg, conId, key);
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

      services.pinoLogger.setContext(CacheMetricService.name);
      const cacheMetricService: CacheMetricService = services.cacheMetricService;

      try {
        const value: boolean = await method(...args);

        if (isNull(value)) {
          services.pinoLogger.debug('`%s` Cache miss for [%s].', conId, key);
          cacheMetricService.track(CacheMethod.DEL, DelStatus.SUCCESS_MISS, namespace, conId);
          return value;
        }

        services.pinoLogger.debug('`%s` Cache eviction for [%s] successfully removed.', conId, key);
        cacheMetricService.track(CacheMethod.DEL, DelStatus.SUCCESS_HIT, namespace, conId);
        return value;
      } catch (error) {
        const errMsg: string = '`%s` Cache eviction for [%s] has an error occurred.';
        services.pinoLogger.error(error, errMsg, conId, key);
        cacheMetricService.track(CacheMethod.DEL, DelStatus.ERROR_DEL_VALUE, namespace, conId);
      }
    },
    [CacheMetricService],
  );
};
