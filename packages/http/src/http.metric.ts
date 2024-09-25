import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Histogram,
  Injectable,
  InjectMetric,
  linkTransform,
} from '@joktec/core';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpConfig } from './http.config';
import { httpExceptionHandler } from './http.exception';

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
    async function (options: CallbackMethodOptions): Promise<AxiosResponse<any>> {
      const { method, args, services } = options;
      const [config, conId = DEFAULT_CON_ID] = args;

      const httpConfig: HttpConfig = this?.getConfig(conId);
      const methodName = config.method ?? httpConfig?.method;
      const baseUrl = config.baseURL ?? httpConfig?.baseURL;
      const url = config.url ?? httpConfig?.url;

      const absoluteUrl = linkTransform(url, baseUrl, 'absolute');
      const path = `[${methodName.toUpperCase()}] ${absoluteUrl}`;

      const httpMetric: HttpMetricService = services.httpMetricService;
      const duration = httpMetric.duration(path);
      services.pinoLogger.debug('Starting call to %s', path);

      try {
        const response: AxiosResponse = await method(...args);
        const time = duration();
        httpMetric.trackStatus('SUCCESS', path, response);
        services.pinoLogger.debug('Successfully request http to %s, time call: %s ms', path, time);
        return response;
      } catch (err) {
        duration();
        httpMetric.trackStatus('FAILED', path, err);

        if (err instanceof AxiosError) {
          const msg = '`%s` http request to %s error with status %s';
          if (err.response?.data) {
            const { status, data } = err.response;
            services.pinoLogger.error({ data }, msg, conId, path, status);
          } else if (httpConfig.debug) {
            services.pinoLogger.error(err, msg, conId, path, err.response.status);
          } else {
            services.pinoLogger.error(msg, conId, path, err.response.status);
          }

          if (config.throwError) throw httpExceptionHandler(err);
          return err.response;
        }

        services.pinoLogger.error(err, '`%s` http request to %s cause exception', conId, path);
        throw httpExceptionHandler(err);
      }
    },
    [HttpMetricService],
  );
