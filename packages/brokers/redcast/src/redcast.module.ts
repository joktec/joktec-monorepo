import { CounterProviders, Global, Module } from '@joktec/core';
import { RedcastConsumerLoader, RedcastSubscriberLoader } from './loaders';
import { RedcastMetricService, TOTAL_RECEIVE_REDCAST_METRIC, TOTAL_SEND_REDCAST_METRIC } from './redcast.metric';
import { RedcastService } from './redcast.service';

@Global()
@Module({
  imports: [],
  providers: [
    RedcastService,
    RedcastSubscriberLoader,
    RedcastConsumerLoader,
    RedcastMetricService,
    ...CounterProviders([
      { name: TOTAL_SEND_REDCAST_METRIC, label: ['type', 'status', 'channel', 'conId'] },
      { name: TOTAL_RECEIVE_REDCAST_METRIC, label: ['type', 'status', 'channel', 'conId'] },
    ]),
  ],
  exports: [RedcastService],
})
export class RedcastModule {}
