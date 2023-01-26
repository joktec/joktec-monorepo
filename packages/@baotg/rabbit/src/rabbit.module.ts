import { CounterProviders, Module, Global } from '@baotg/core';
import { RabbitService } from './rabbit.service';
import { TOTAL_PUBLISH_RABBIT_METRIC, TOTAL_CONSUME_RABBIT_METRIC, RabbitMetricService } from './rabbit.metric';

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
