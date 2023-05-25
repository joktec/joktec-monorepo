import { CounterProviders, Module, Global } from '@joktec/core';
import { CacheService } from './cache.service';
import { CacheMetricService, TRACK_STATUS_CACHE_METRIC } from './cache.metric';

@Global()
@Module({
  imports: [],
  providers: [
    CacheService,
    CacheMetricService,
    ...CounterProviders([{ name: TRACK_STATUS_CACHE_METRIC, label: ['type', 'status', 'namespace', 'conId'] }]),
  ],
  exports: [CacheService],
})
export class CacheModule {}
