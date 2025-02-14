import { CounterProviders, Global, Module } from '@joktec/core';
import { RabbitConsumerLoader } from './loaders';
import { RabbitMetricService, TOTAL_CONSUME_RABBIT_METRIC, TOTAL_PUBLISH_RABBIT_METRIC } from './rabbit.metric';
import { RabbitService } from './rabbit.service';

@Global()
@Module({
  imports: [],
  providers: [
    RabbitService,
    RabbitConsumerLoader,
    RabbitMetricService,
    ...CounterProviders([
      { name: TOTAL_PUBLISH_RABBIT_METRIC, label: ['type', 'status', 'queue', 'conId'] },
      { name: TOTAL_CONSUME_RABBIT_METRIC, label: ['status', 'queue', 'conId'] },
    ]),
  ],
  exports: [RabbitService],
})
export class RabbitModule {}
