import { CounterProviders, Global, Module } from '@joktec/core';
import { KafkaMetricService, TOTAL_RECEIVE_KAFKA_METRIC, TOTAL_SEND_KAFKA_METRIC } from './kafka.metric';
import { KafkaService } from './kafka.service';
import { KafkaConsumerLoader } from './loaders';

@Global()
@Module({
  imports: [],
  providers: [
    KafkaService,
    KafkaConsumerLoader,
    KafkaMetricService,
    ...CounterProviders([
      { name: TOTAL_SEND_KAFKA_METRIC, label: ['type', 'status', 'key', 'conId'] },
      { name: TOTAL_RECEIVE_KAFKA_METRIC, label: ['type', 'status', 'key', 'conId'] },
    ]),
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
