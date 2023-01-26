import { CounterProviders, Module, Global } from '@baotg/core';
import { StorageService } from './storage.service';
import { StorageMetricService, TRACK_STATUS_STORAGE_METRIC } from './storage.metric';

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
