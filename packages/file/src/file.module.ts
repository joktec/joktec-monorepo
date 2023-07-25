import { CounterProviders, Global, HistogramProviders, Module } from '@joktec/core';
import { FILE_DURATION_METRIC, FILE_TRACK_STATUS_METRIC, FileMetricService } from './file.metric';
import { FileService } from './file.service';

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
