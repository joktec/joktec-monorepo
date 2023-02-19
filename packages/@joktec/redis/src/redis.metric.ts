import {
  BaseMethodDecorator,
  CallbackDecoratorOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';
import { isNull } from 'lodash';

export const TRACK_STATUS_REDIS_METRIC = 'track_status_redis_metric';

export enum GetStatus {
  SUCCESS_HIT = 'SUCCESS_HIT',
  SUCCESS_MISS = 'SUCCESS_MISS',
  ERROR_GET_VALUE = 'ERROR',
}

export enum SetStatus {
  SUCCESS = 'SUCCESS',
  ERROR_SET_VALUE = 'ERROR',
}

@Injectable()
export class RedisMetricService {
  constructor(@InjectMetric(TRACK_STATUS_REDIS_METRIC) private trackMetric: Counter<string>) {}

  track(type: 'SET' | 'GET', status: GetStatus | SetStatus, namespace: string, conId: string = DEFAULT_CON_ID) {
    this.trackMetric.inc({ type, status, namespace, conId });
  }
}

export const GetRedisMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackDecoratorOptions): Promise<any> => {
      const { method, args, services } = options;
      const [key, namespace, conId = DEFAULT_CON_ID] = args;
      const redisMetricService: RedisMetricService = services.redisMetricService;

      try {
        const value = await method(...args);
        services.pinoLogger.debug('`%s` redis lookup success %s = %s', conId, key, value);
        if (isNull(value)) {
          redisMetricService.track('GET', GetStatus.SUCCESS_MISS, namespace, conId);
          return value;
        }
        redisMetricService.track('GET', GetStatus.SUCCESS_HIT, namespace, conId);
        return value;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` redis failed to get redis cache by key `%s`', conId, key);
        redisMetricService.track('GET', GetStatus.ERROR_GET_VALUE, namespace, conId);
      }
    },
    [RedisMetricService],
  );
};

export const SetRedisMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackDecoratorOptions): Promise<any> => {
      const { method, args, services } = options;
      const [key, value, namespace, expiry, conId = DEFAULT_CON_ID] = args;
      const redisMetricService: RedisMetricService = services.redisMetricService;

      try {
        await method(...args);
        services.pinoLogger.debug('`%s` redis set a cache is a success with key=%s, value=%s', conId, key, value);
        redisMetricService.track('SET', SetStatus.SUCCESS, namespace, conId);
      } catch (error) {
        services.pinoLogger.error(error, '`%s` redis failed to set redis cache by key=%s, value=%s', conId, key, value);
        redisMetricService.track('SET', SetStatus.ERROR_SET_VALUE, namespace, conId);
      }
    },
    [RedisMetricService],
  );
};
