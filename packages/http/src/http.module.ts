import { CounterProviders, HistogramProviders, Global, Module } from '@joktec/core';
import { HTTP_DURATION_SECONDS_METRIC, HTTP_TOTAL_METRIC, HttpMetricService } from './http.metric';
import { HttpService } from './http.service';

@Global()
@Module({
  imports: [],
  providers: [
    HttpService,
    HttpMetricService,
    ...HistogramProviders([{ name: HTTP_DURATION_SECONDS_METRIC, label: ['path'] }]),
    ...CounterProviders([{ name: HTTP_TOTAL_METRIC, label: ['path', 'status', 'statusCode'] }]),
  ],
  exports: [HttpService],
})
export class HttpModule {}
