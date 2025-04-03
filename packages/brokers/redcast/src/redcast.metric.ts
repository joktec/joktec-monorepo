import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const TOTAL_PUBLISH_REDCAST_METRIC = 'total_publish_redcast_metric';
export const TOTAL_CONSUME_REDCAST_METRIC = 'total_consume_redcast_metric';

export enum RedcastPublishStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

@Injectable()
export class RedcastMetricService {
  constructor(
    @InjectMetric(TOTAL_PUBLISH_REDCAST_METRIC) private totalPublish: Counter<string>,
    @InjectMetric(TOTAL_CONSUME_REDCAST_METRIC) private totalConsume: Counter<string>,
  ) {}

  publish(status: RedcastPublishStatus, channel: string, conId: string = DEFAULT_CON_ID) {
    this.totalPublish.inc({ status, channel, conId });
  }

  consume(status: RedcastPublishStatus, channelOrPattern: string, conId: string = DEFAULT_CON_ID) {
    this.totalConsume.inc({ status, channel: channelOrPattern, conId });
  }
}

export const RedcastPublishMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, services } = options;
      const [channel, message, conId = DEFAULT_CON_ID] = args;
      const redcastMetricService: RedcastMetricService = services.redcastMetricService;

      try {
        await method(...args);
        redcastMetricService.publish(RedcastPublishStatus.SUCCESS, channel, conId);
        services.pinoLogger.debug('`%s` [%s] redcast publish success', conId, channel);
      } catch (error) {
        redcastMetricService.publish(RedcastPublishStatus.ERROR, channel, conId);
        services.pinoLogger.error(error, '`%s` [%s] redcast publish error', conId, channel);
      }
    },
    [RedcastMetricService],
  );
};
