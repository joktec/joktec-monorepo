import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const TOTAL_SEND_KAFKA_METRIC = 'total_send_kafka_metric';
export const TOTAL_RECEIVE_KAFKA_METRIC = 'total_receive_kafka_metric';

export enum KafkaMetricStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

@Injectable()
export class KafkaMetricService {
  constructor(
    @InjectMetric(TOTAL_SEND_KAFKA_METRIC) public totalSend: Counter<string>,
    @InjectMetric(TOTAL_RECEIVE_KAFKA_METRIC) public totalReceive: Counter<string>,
  ) {}

  send(type: string, status: KafkaMetricStatus, key: string, conId: string = DEFAULT_CON_ID) {
    this.totalSend.inc({ type, status, key, conId });
  }

  receive(type: string, status: KafkaMetricStatus, key: string, conId: string = DEFAULT_CON_ID) {
    this.totalReceive.inc({ type, status, key, conId });
  }
}

export const KafkaSendMetric = (): MethodDecorator => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions) => {
      const { args, method, propertyKey, services } = options;
      const [record = {}, producerConfig, conId = DEFAULT_CON_ID] = args;
      const key = record.producerKey ?? record.topic ?? undefined;
      const type = String(propertyKey);

      const kafkaMetric: KafkaMetricService = services.kafkaMetricService;

      try {
        await method(...args);
        kafkaMetric.send(type, key, KafkaMetricStatus.SUCCESS, conId);
        services.pinoLogger.debug(record, '`%s` [%s] kafka %s success', conId, key, type);
      } catch (error) {
        kafkaMetric.send(type, key, KafkaMetricStatus.ERROR, conId);
        services.pinoLogger.error(error, '`%s` [%s] kafka %s error', conId, key, type);
      }
    },
    [KafkaMetricService],
  );
};
