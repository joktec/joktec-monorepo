import { CounterProviders, Global, Module } from '@joktec/core';
import { KafkaMetricService, TOTAL_PUBLISH_KAFKA_METRIC } from './kafka.metric';
import { KafkaService } from './kafka.service';
import { KafkaBatchConsumerLoader, KafkaConsumerLoader } from './loaders';

@Global()
@Module({
  imports: [],
  providers: [
    KafkaService,
    KafkaConsumerLoader,
    KafkaBatchConsumerLoader,
    KafkaMetricService,
    ...CounterProviders([{ name: TOTAL_PUBLISH_KAFKA_METRIC, label: ['key', 'type', 'status', 'conId'] }]),
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
