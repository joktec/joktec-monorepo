import { Agent, AgentOptions } from 'http';
import { AbstractClientService, DEFAULT_CON_ID, Injectable, toArray, toBool } from '@joktec/core';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import curlirize from 'axios-curlirize';
import FormData from 'form-data';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import mergeDeep from 'merge-deep';
import qs from 'qs';
import * as rax from 'retry-axios';
import { HttpClient } from './http.client';
import { HttpConfig, HttpProxyConfig } from './http.config';
import { HttpMetricDecorator } from './http.metric';
import { HttpFormData, HttpRequest, HttpResponse } from './models';

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
        this.logService.error(err, 'Curlirize error:\n%s', command);
        return;
      }
      this.logService.info('Curlirize:\n%s', command);
    });
    return myAxiosInstance;
  }

  async start(client: AxiosInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Implement
  }

  async stop(client: AxiosInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Implement
  }

  buildAgent(opt: AgentOptions = { keepAlive: true }, proxy?: HttpProxyConfig): Agent {
    if (!proxy) return new Agent(opt);
    const proxyBody = {
      host: proxy.host,
      port: proxy.port,
      auth: `${proxy.auth.username}:${proxy.auth.password}`,
    };
    if (proxy?.protocol === 'https') return new HttpsProxyAgent({ ...opt, ...proxyBody });
    return new HttpProxyAgent({ ...opt, ...proxyBody });
  }

  @HttpMetricDecorator()
  async request<T = any>(config: HttpRequest, conId: string = DEFAULT_CON_ID): Promise<HttpResponse<T>> {
    const clientConfig = this.getConfig(conId);
    const cf: AxiosRequestConfig = mergeDeep({}, clientConfig, config, {
      paramsSerializer: config.serializer && {
        encode: (params: Record<string, any>) => qs.stringify(params, { arrayFormat: 'brackets' }),
      },
      curlirize: toBool(config.curlirize, clientConfig.curlirize),
    });
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
    const cf: AxiosRequestConfig = mergeDeep({}, clientConfig, config, {
      method: 'POST',
      headers: { ...config.headers, 'Content-Type': 'multipart/form-data' },
      data: formData,
      paramsSerializer: config.serializer && {
        encode: (params: Record<string, any>) => qs.stringify(params, { arrayFormat: 'brackets' }),
      },
      curlirize: toBool(config.curlirize, clientConfig.curlirize),
    });

    return this.getClient(conId).request<T>(cf);
  }
}
