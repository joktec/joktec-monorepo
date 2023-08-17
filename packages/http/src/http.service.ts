import { AbstractClientService, DEFAULT_CON_ID, Injectable, toArray, toBool } from '@joktec/core';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import curlirize from 'axios-curlirize';
import FormData from 'form-data';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { cloneDeep } from 'lodash';
import mergeDeep from 'merge-deep';
import qs from 'qs';
import * as rax from 'retry-axios';
import { HttpClient } from './http.client';
import { HttpConfig } from './http.config';
import { HttpMetricDecorator } from './http.metric';
import { HttpFormData, HttpProxy, HttpRequest, HttpResponse } from './models';

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
    curlirize(myAxiosInstance, (result, err) => {
      const { command } = result;
      if (err) {
        this.logService.error(err);
        return;
      }
      this.logService.info(command);
    });
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
    if (protocol === 'https') result.httpsAgent = new HttpsProxyAgent(proxyBody);
    if (protocol === 'http') result.httpAgent = new HttpProxyAgent(proxyBody);
    return result;
  }

  @HttpMetricDecorator()
  async request<T = any>(config: HttpRequest, conId: string = DEFAULT_CON_ID): Promise<HttpResponse<T>> {
    const clientConfig = this.getConfig(conId);
    const proxyConfig = this.buildProxy(config.url, config.proxy);
    const cf: AxiosRequestConfig = mergeDeep(cloneDeep(clientConfig), config, proxyConfig, {
      curlirize: toBool(config.curlirize, clientConfig.curlirize),
    });
    if (config.serializer) {
      cf.paramsSerializer = { encode: params => qs.stringify(params) };
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
    Object.keys(data).map(key => toArray(data[key]).map(v => formData.append(key, v, 'file')));

    const clientConfig = this.getConfig(conId);
    const proxyConfig = this.buildProxy(config.url, config.proxy);
    const cf: AxiosRequestConfig = mergeDeep(cloneDeep(clientConfig), config, proxyConfig, {
      method: 'POST',
      headers: { ...config.headers, 'Content-Type': 'multipart/form-data' },
      data: formData,
      curlirize: toBool(config.curlirize, clientConfig.curlirize),
    });

    if (config.serializer) {
      cf.paramsSerializer = { encode: params => qs.stringify(params) };
    }

    return this.getClient(conId).request<T>(cf);
  }
}
