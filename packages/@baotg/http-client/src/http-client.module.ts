import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from './http-client.service';
import {
  HTTP_CLIENT_DURATION_SECONDS_METRIC,
  HTTP_CLIENT_TOTAL_METRIC,
  HttpClientMetricService,
} from './http-client.metric';
import { CounterProviders, HistogramProviders } from '@baotg/core';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    HttpClientService,
    HttpClientMetricService,
    ...HistogramProviders([{ name: HTTP_CLIENT_DURATION_SECONDS_METRIC, label: ['path'] }]),
    ...CounterProviders([
      {
        name: HTTP_CLIENT_TOTAL_METRIC,
        label: ['path', 'status', 'statusCode'],
      },
    ]),
  ],
  exports: [HttpClientService],
})
export class HttpClientModule {}
