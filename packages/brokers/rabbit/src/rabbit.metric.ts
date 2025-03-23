import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const TOTAL_PUBLISH_RABBIT_METRIC = 'total_publish_rabbit_metric';
export const TOTAL_CONSUME_RABBIT_METRIC = 'total_consume_rabbit_metric';

export enum RabbitPublishStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

enum PublishType {
  sendToQueue = 'QUEUE',
  publish = 'EXCHANGE',
}

@Injectable()
export class RabbitMetricService {
  constructor(
    @InjectMetric(TOTAL_PUBLISH_RABBIT_METRIC) private totalPublish: Counter<string>,
    @InjectMetric(TOTAL_CONSUME_RABBIT_METRIC) private totalConsume: Counter<string>,
  ) {}

  publish(type: PublishType, status: RabbitPublishStatus, queue: string, conId: string = DEFAULT_CON_ID) {
    this.totalPublish.inc({ type, status, queue, conId });
  }

  consume(status: RabbitPublishStatus, queue: string, conId: string = DEFAULT_CON_ID) {
    this.totalConsume.inc({ status, queue, conId });
  }
}

export const RabbitPublishMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, propertyKey, services } = options;
      const [queueOrExchange, messages, opts = {}, conId = DEFAULT_CON_ID] = args;
      const channelKey = opts.channelKey ?? queueOrExchange ?? undefined;
      const type = PublishType[propertyKey];
      const rabbitMetricService: RabbitMetricService = services.rabbitMetricService;

      try {
        await method(...args);
        rabbitMetricService.publish(type, RabbitPublishStatus.SUCCESS, queueOrExchange, conId);
        services.pinoLogger.debug('`%s` [%s] rabbit %s success', conId, channelKey, type);
      } catch (error) {
        rabbitMetricService.publish(type, RabbitPublishStatus.ERROR, queueOrExchange, conId);
        services.pinoLogger.error(error, '`%s` [%s] rabbit %s error', conId, channelKey, type);
      }
    },
    [RabbitMetricService],
  );
};
