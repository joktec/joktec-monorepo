import { Agent } from 'http';
import { AxiosRequestConfig } from 'axios';
import { IAxiosRetryConfig } from 'axios-retry';
import { HttpProxyConfig } from '../http.config';

/**
 * See more: https://axios-http.com/docs/req_config
 */
export interface HttpRequest extends AxiosRequestConfig {
  proxy?: HttpProxyConfig;
  httpAgent?: Agent;
  httpsAgent?: Agent;
  serializer?: boolean;
  curlirize?: boolean;
  throwError?: boolean;
  axiosRetry?: IAxiosRetryConfig;

  [key: string]: any;
}

export interface HttpFormData {
  formData: {
    [key: string]: string | number | boolean | File | Buffer | Array<File> | Array<Buffer>;
  };
}
