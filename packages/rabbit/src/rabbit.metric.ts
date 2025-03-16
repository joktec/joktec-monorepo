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

export const RabbitMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, propertyKey, services } = options;
      const conId = args[3] ?? DEFAULT_CON_ID;
      const queue = args[0];
      const rabbitMetricService: RabbitMetricService = services.rabbitMetricService;
      try {
        await method(...args);
        rabbitMetricService.publish(PublishType[propertyKey], RabbitPublishStatus.SUCCESS, queue, conId);
      } catch (error) {
        services.pinoLogger.error(error, '`%s` rabbit service publish error.', conId);
        rabbitMetricService.publish(PublishType[propertyKey], RabbitPublishStatus.ERROR, queue, conId);
      }
    },
    [RabbitMetricService],
  );
};
