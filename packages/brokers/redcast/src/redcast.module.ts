import { CounterProviders, Global, Module } from '@joktec/core';
import { RedcastSubscriberLoader } from './loaders';
import { RedcastMetricService, TOTAL_CONSUME_REDCAST_METRIC, TOTAL_PUBLISH_REDCAST_METRIC } from './redcast.metric';
import { RedcastService } from './redcast.service';

@Global()
@Module({
  imports: [],
  providers: [
    RedcastService,
    RedcastSubscriberLoader,
    RedcastMetricService,
    ...CounterProviders([
      { name: TOTAL_PUBLISH_REDCAST_METRIC, label: ['status', 'channel', 'conId'] },
      { name: TOTAL_CONSUME_REDCAST_METRIC, label: ['status', 'channel', 'conId'] },
    ]),
  ],
  exports: [RedcastService],
})
export class RedcastModule {}
