import {
  BaseMethodDecorator,
  CallbackDecoratorOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const TOTAL_PUBLISH_KAFKA_METRIC = 'TOTAL_PUBLISH_KAFKA_METRIC';

const MethodMessage = {
  publish: 'publish',
  publishManyTopic: 'publish many',
};

@Injectable()
export class KafkaMetricService {
  constructor(@InjectMetric(TOTAL_PUBLISH_KAFKA_METRIC) public totalPublish: Counter<string>) {}

  increase(type: string, key: string, status: 'ERROR' | 'SUCCESS', conId: string = DEFAULT_CON_ID) {
    this.totalPublish.inc({ type, key, status, conId });
  }
}

export const PublishKafkaMetric = () =>
  BaseMethodDecorator(
    async (options: CallbackDecoratorOptions) => {
      const { args, method, propertyKey, services } = options;
      const [record = {}, producerConfig, conId = DEFAULT_CON_ID] = args;
      const key = record.producerKey ?? record.topic ?? undefined;
      const kafkaMetric: KafkaMetricService = services.kafkaMetricService;

      try {
        await method(...args);
        kafkaMetric.increase(propertyKey as string, key, 'SUCCESS', conId);
        services.pinoLogger.debug(record, '[`%s` %s-producer] %s success', conId, key, MethodMessage[propertyKey]);
      } catch (error) {
        kafkaMetric.increase(propertyKey as string, key, 'ERROR', conId);
        services.pinoLogger.error(error, '[`%s` %s-producer] %s error', conId, key, MethodMessage[propertyKey]);
      }
    },
    [KafkaMetricService],
  );
