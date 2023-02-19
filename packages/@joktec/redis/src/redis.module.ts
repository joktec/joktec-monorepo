import { CounterProviders, Module, Global } from '@joktec/core';
import { RedisService } from './redis.service';
import { RedisMetricService, TRACK_STATUS_REDIS_METRIC } from './redis.metric';

@Global()
@Module({
  imports: [],
  providers: [
    RedisService,
    RedisMetricService,
    ...CounterProviders([{ name: TRACK_STATUS_REDIS_METRIC, label: ['type', 'status', 'namespace', 'conId'] }]),
  ],
  exports: [RedisService],
})
export class RedisModule {}
