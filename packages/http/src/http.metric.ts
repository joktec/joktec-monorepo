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
import axios, { AxiosError, AxiosResponse } from 'axios';
import { isFunction } from 'lodash';
import { HttpConfig } from './http.config';
import { HttpClientException } from './http.exception';

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

        if (axios.isAxiosError(err)) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          if (err.response) {
            const msg = '`%s` http request to %s failed with status %s';
            const { status, data, statusText } = err.response;
            const { code, message, name } = err;

            const errData = { message, name, code, data };
            if (!httpConfig.debug) services.pinoLogger.error(errData, msg, conId, path, status);
            else services.pinoLogger.error({ ...errData, ...err.response }, msg, conId, path, status);

            // Handle validateResponse as function (sync or async)
            if (isFunction(config.validateResponse)) {
              const shouldReturnResponse = await Promise.resolve(config.validateResponse(err.response));
              if (shouldReturnResponse) return err.response;
            }

            if (config.validateResponse === 'throw') throw new HttpClientException(statusText, err.response);
            return err.response;
          }

          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
          if (err.request) {
            const msg = '`%s` http request to %s error with no response';
            const { code, message, name, cause } = err;
            services.pinoLogger.error({ message, name, code, cause }, msg, conId, path);
            throw new HttpClientException(err.message ?? 'Unknown', err.toJSON());
          }
        }

        // Something happened in setting up the request that triggered an Error
        services.pinoLogger.error(err, '`%s` http request to %s cause exception', conId, path);
        throw err;
      }
    },
    [HttpMetricService],
  );
