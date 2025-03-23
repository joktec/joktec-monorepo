import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const TOTAL_PUBLISH_KAFKA_METRIC = 'total_publish_kafka_metric';
export const TOTAL_CONSUME_KAFKA_METRIC = 'total_consume_kafka_metric';

export enum KafkaPublishStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

enum PublishType {
  publish = 'publish',
  publishBatch = 'publishBatch',
}

export enum KafkaConsumeType {
  EACH = 'each',
  BATCH = 'batch',
}

@Injectable()
export class KafkaMetricService {
  constructor(
    @InjectMetric(TOTAL_PUBLISH_KAFKA_METRIC) public totalPublish: Counter<string>,
    @InjectMetric(TOTAL_CONSUME_KAFKA_METRIC) public totalConsume: Counter<string>,
  ) {}

  publish(type: PublishType, status: KafkaPublishStatus, key: string, conId: string = DEFAULT_CON_ID) {
    this.totalPublish.inc({ type, status, key, conId });
  }

  consume(type: KafkaConsumeType, status: KafkaPublishStatus, key: string, conId: string = DEFAULT_CON_ID) {
    this.totalConsume.inc({ type, status, key, conId });
  }
}

export const KafkaPublishMetric = (): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions) => {
      const { args, method, propertyKey, services } = options;
      const [record = {}, producerConfig, conId = DEFAULT_CON_ID] = args;
      const key = record.producerKey ?? record.topic ?? undefined;
      const type = PublishType[propertyKey];
      const kafkaMetric: KafkaMetricService = services.kafkaMetricService;

      try {
        await method(...args);
        kafkaMetric.publish(type, key, KafkaPublishStatus.SUCCESS, conId);
        services.pinoLogger.debug(record, '`%s` [%s] kafka %s success', conId, key, type);
      } catch (error) {
        kafkaMetric.publish(type, key, KafkaPublishStatus.ERROR, conId);
        services.pinoLogger.error(error, '`%s` [%s] kafka %s error', conId, key, type);
      }
    },
    [KafkaMetricService],
  );
};
