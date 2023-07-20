import { CounterProviders, Module, Global } from '@joktec/core';
import { TOTAL_PUBLISH_KAFKA_METRIC, KafkaMetricService } from './kafka.metric';
import { KafkaService } from './kafka.service';

@Global()
@Module({
  imports: [],
  providers: [
    KafkaService,
    KafkaMetricService,
    ...CounterProviders([{ name: TOTAL_PUBLISH_KAFKA_METRIC, label: ['key', 'type', 'status', 'conId'] }]),
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
