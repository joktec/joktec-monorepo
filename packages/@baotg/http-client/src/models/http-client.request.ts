import { AxiosRequestConfig, AxiosProxyConfig } from 'axios';

export type HttpClientProxy = AxiosProxyConfig | false;

export interface HttpClientRequest extends AxiosRequestConfig {
  proxy?: HttpClientProxy;
}
