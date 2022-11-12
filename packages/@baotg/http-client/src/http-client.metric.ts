import { BaseMethodDecorator, CallbackDecoratorOptions, Injectable, DEFAULT_CON_ID } from '@baotg/core';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { AxiosError, AxiosResponse } from 'axios';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Counter, Histogram } from 'prom-client';
import { httpClientExceptionHandler } from './exceptions';

const validUrl = require('valid-url');

export const HTTP_CLIENT_DURATION_SECONDS_METRIC = 'http_client_duration_seconds';
export const HTTP_CLIENT_TOTAL_METRIC = 'http_client_total';

@Injectable()
export class HttpClientMetricService {
  constructor(
    @InjectMetric(HTTP_CLIENT_DURATION_SECONDS_METRIC)
    private httpClientDurationSecondsMetrics: Histogram<string>,
    @InjectMetric(HTTP_CLIENT_TOTAL_METRIC)
    private httpClientTotalMetric: Counter<string>,
  ) {}

  duration(path: string) {
    return this.httpClientDurationSecondsMetrics.startTimer({ path });
  }

  trackStatus(status: 'FAILED' | 'SUCCESS', path: string, data: AxiosResponse | AxiosError) {
    if (status === 'SUCCESS') {
      this.httpClientTotalMetric.inc({
        path,
        status: 'SUCCESS',
        statusCode: data['status'] ?? 'UNKNOWN',
      });
    } else {
      this.httpClientTotalMetric.inc({
        path,
        status: data['response']?.data?.status ?? 'FAILED',
        statusCode: data['response']?.status ?? data['code'] ?? 'UNKNOWN',
      });
    }
  }
}

export const HttpClientMetricDecorator = () =>
  BaseMethodDecorator(
    function (options: CallbackDecoratorOptions): any {
      const { method, args, services } = options;
      const [config, conId = DEFAULT_CON_ID] = args;

      const httpClientMetric: HttpClientMetricService = services.httpClientMetricService,
        methodName = config.method ?? this.getConfig(conId).method,
        baseUrl = config.baseURL ?? (this && this.getConfig(conId).baseURL),
        url = config.url ?? (this && this.getConfig(conId).url);
      let path = `${methodName.toUpperCase()} ${url}`;

      if (!validUrl.isUri(url) && baseUrl) {
        path = `${methodName.toUpperCase()} ${url ? `${baseUrl}/${url}` : baseUrl}`;
      }

      const duration = httpClientMetric.duration(path);
      services.pinoLogger.debug('Starting call to %s', path);

      return method(...args).pipe(
        tap((response: AxiosResponse) => {
          const time = duration();
          httpClientMetric.trackStatus('SUCCESS', path, response);
          services.pinoLogger.debug('Successfully request http to %s, time call: %s ms', path, time);
        }),
        catchError((err: AxiosError) => {
          duration();
          httpClientMetric.trackStatus('FAILED', path, err);
          if (err.response?.data) {
            services.pinoLogger.error(
              '`%s` httpClient request to %s error with status [%s] and data: %j',
              conId,
              path,
              err.response.status,
              err.response.data,
            );
          } else {
            services.pinoLogger.error(err, '`%s` httpClient request to %s error', conId, path);
          }
          return throwError(httpClientExceptionHandler(err));
        }),
      );
    },
    [HttpClientMetricService],
  );
