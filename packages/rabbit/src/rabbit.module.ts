import { CounterProviders, Module, Global } from '@joktec/core';
import { TOTAL_PUBLISH_RABBIT_METRIC, TOTAL_CONSUME_RABBIT_METRIC, RabbitMetricService } from './rabbit.metric';
import { RabbitService } from './rabbit.service';

@Global()
@Module({
  imports: [],
  providers: [
    RabbitService,
    RabbitMetricService,
    ...CounterProviders([
      { name: TOTAL_PUBLISH_RABBIT_METRIC, label: ['type', 'status', 'queue', 'conId'] },
      { name: TOTAL_CONSUME_RABBIT_METRIC, label: ['status', 'queue', 'conId'] },
    ]),
  ],
  exports: [RabbitService],
})
export class RabbitModule {}
