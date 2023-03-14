import {
  BaseMethodDecorator,
  CallbackDecoratorOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
  Histogram,
} from '@joktec/core';
import { AxiosError, AxiosResponse } from 'axios';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { httpExceptionHandler } from './http.exception';

const validUrl = require('valid-url');

export const HTTP_DURATION_SECONDS_METRIC = 'http_duration_seconds';
export const HTTP_TOTAL_METRIC = 'http_total';

@Injectable()
export class HttpMetricService {
  constructor(
    @InjectMetric(HTTP_DURATION_SECONDS_METRIC) private httpDurationSecondsMetrics: Histogram<string>,
    @InjectMetric(HTTP_TOTAL_METRIC) private httpTotalMetric: Counter<string>,
  ) {}

  duration(path: string) {
    return this.httpDurationSecondsMetrics.startTimer({ path });
  }

  trackStatus(status: 'FAILED' | 'SUCCESS', path: string, data: AxiosResponse | AxiosError) {
    if (status === 'SUCCESS') {
      this.httpTotalMetric.inc({ path, status: 'SUCCESS', statusCode: data['status'] ?? 'UNKNOWN' });
    } else {
      this.httpTotalMetric.inc({
        path,
        status: data['response']?.data?.status ?? 'FAILED',
        statusCode: data['response']?.status ?? data['code'] ?? 'UNKNOWN',
      });
    }
  }
}

export const HttpMetricDecorator = () =>
  BaseMethodDecorator(
    function (options: CallbackDecoratorOptions): any {
      const { method, args, services } = options;
      const [config, conId = DEFAULT_CON_ID] = args;

      const httpMetric: HttpMetricService = services.httpMetricService;
      const methodName = config.method ?? this.getConfig(conId).method;
      const baseUrl = config.baseURL ?? (this && this.getConfig(conId).baseURL);
      const url = config.url ?? (this && this.getConfig(conId).url);
      let path = `${methodName.toUpperCase()} ${url}`;

      if (!validUrl.isUri(url) && baseUrl) {
        path = `${methodName.toUpperCase()} ${url ? `${baseUrl}/${url}` : baseUrl}`;
      }

      const duration = httpMetric.duration(path);
      services.pinoLogger.debug('Starting call to %s', path);

      return method(...args).pipe(
        tap((response: AxiosResponse) => {
          const time = duration();
          httpMetric.trackStatus('SUCCESS', path, response);
          services.pinoLogger.debug('Successfully request http to %s, time call: %s ms', path, time);
        }),
        catchError((err: AxiosError) => {
          duration();
          httpMetric.trackStatus('FAILED', path, err);
          if (err.response?.data) {
            services.pinoLogger.error(
              '`%s` http request to %s error with status [%s] and data: %j',
              conId,
              path,
              err.response.status,
              err.response.data,
            );
          } else {
            services.pinoLogger.error(err, '`%s` http request to %s error', conId, path);
          }
          return throwError(() => httpExceptionHandler(err));
        }),
      );
    },
    [HttpMetricService],
  );
