import { CounterProviders, Module, Global } from '@joktec/core';
import { StorageMetricService, TRACK_STATUS_STORAGE_METRIC } from './storage.metric';
import { StorageService } from './storage.service';

@Global()
@Module({
  imports: [],
  providers: [
    StorageService,
    StorageMetricService,
    ...CounterProviders([{ name: TRACK_STATUS_STORAGE_METRIC, label: ['type', 'status', 'bucket', 'conId'] }]),
  ],
  exports: [StorageService],
})
export class StorageModule {}
