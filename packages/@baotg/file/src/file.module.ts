import { CounterProviders, HistogramProviders, Global, Module } from '@baotg/core';
import { FileService } from './file.service';
import { FILE_DURATION_METRIC, FILE_TRACK_STATUS_METRIC, FileMetricService } from './file.metric';

@Global()
@Module({
  imports: [],
  providers: [
    FileService,
    FileMetricService,
    ...CounterProviders([{ name: FILE_TRACK_STATUS_METRIC, label: ['type', 'status', 'conId'] }]),
    ...HistogramProviders([{ name: FILE_DURATION_METRIC, label: ['type', 'conId'] }]),
  ],
  exports: [FileService],
})
export class FileModule {}
