import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@joktec/core';
import { cloneDeep } from 'lodash';
import * as rax from 'retry-axios';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import mergeDeep from 'merge-deep';
import { HttpConfig } from './http.config';
import { HttpClient } from './http.client';
import { HttpMetricDecorator } from './http.metric';
import { HttpFormData, HttpProxy, HttpRequest, HttpResponse } from './models';
import FormData from 'form-data';
import qs from 'qs';

@Injectable()
export class HttpService extends AbstractClientService<HttpConfig, AxiosInstance> implements HttpClient {
  constructor() {
    super('http', HttpConfig);
  }

  async init(config: HttpConfig): Promise<AxiosInstance> {
    const myAxiosInstance: AxiosInstance = axios.create();
    config.onRetryAttempt(this.logService);
    myAxiosInstance.defaults.raxConfig = { instance: myAxiosInstance, ...config.raxConfig };
    rax.attach(myAxiosInstance);
    return myAxiosInstance;
  }

  async start(client: AxiosInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Implement
  }

  async stop(client: AxiosInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Implement
  }

  private buildProxy(link: string, proxy: HttpProxy): { httpsAgent: any; httpAgent: any; proxy: boolean } {
    const result = { httpsAgent: null, httpAgent: null, proxy: false };
    if (!proxy) return result;

    const protocol = proxy.protocol || new URL(link).protocol;
    const proxyBody = {
      host: proxy.host,
      port: proxy.port,
      auth: `${proxy.auth.username}:${proxy.auth.password}`,
    };

    if (protocol === 'https') {
      result.httpsAgent = new HttpsProxyAgent(proxyBody);
      return result;
    }

    result.httpAgent = new HttpProxyAgent(proxyBody);
    return result;
  }

  @HttpMetricDecorator()
  async request<T = any>(config: HttpRequest, conId: string = DEFAULT_CON_ID): Promise<HttpResponse<T>> {
    const proxyConfig = this.buildProxy(config.url, config.proxy);
    const cf: AxiosRequestConfig = mergeDeep(cloneDeep(this.getConfig(conId)), config, proxyConfig);
    if (config.serializer) {
      cf.paramsSerializer = {
        encode: params => qs.stringify(params),
      };
    }
    return this.getClient(conId).request<T>(cf);
  }

  @HttpMetricDecorator()
  async upload<T = any>(
    config: HttpRequest,
    data: HttpFormData,
    conId: string = DEFAULT_CON_ID,
  ): Promise<HttpResponse<T>> {
    const formData = new FormData();
    Object.keys(data).map(key => {
      const value = data[key];
      if (Array.isArray(value)) {
        value.map(v => formData.append(key, v, 'file'));
      } else {
        formData.append(key, value);
      }
    });

    const proxyConfig = this.buildProxy(config.url, config.proxy);
    const cf: AxiosRequestConfig = mergeDeep(cloneDeep(this.getConfig(conId)), config, proxyConfig, {
      method: 'POST',
      headers: {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    if (config.serializer) {
      cf.paramsSerializer = {
        encode: params => qs.stringify(params),
      };
    }

    return this.getClient(conId).request<T>(cf);
  }
}
