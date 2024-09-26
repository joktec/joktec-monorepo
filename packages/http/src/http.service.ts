import { AgentOptions } from 'http';
import { AbstractClientService, DEFAULT_CON_ID, Injectable, toArray, toBool, toInt } from '@joktec/core';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import curlirize from 'axios-curlirize';
import axiosRetry from 'axios-retry';
import FormData from 'form-data';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import mergeDeep from 'merge-deep';
import qs from 'qs';
import { HttpClient } from './http.client';
import { HttpConfig, HttpProxyConfig } from './http.config';
import { HttpMetricDecorator } from './http.metric';
import { HttpAgent, HttpFormRequest, HttpRequest, HttpResponse } from './models';

@Injectable()
export class HttpService extends AbstractClientService<HttpConfig, AxiosInstance> implements HttpClient {
  constructor() {
    super('http', HttpConfig);
  }

  async init(config: HttpConfig): Promise<AxiosInstance> {
    const myAxiosInstance: AxiosInstance = axios.create({ ...config });
    myAxiosInstance.interceptors.request.use(
      requestConfig => {
        this.logService.setContext(this.context);
        return requestConfig;
      },
      error => Promise.reject(error),
    );
    return myAxiosInstance;
  }

  async start(client: AxiosInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);

    axiosRetry(client, config.getRetryConfig(this.logService));

    curlirize(client as any, (result, err) => {
      const { command } = result;
      if (err) {
        this.logService.error(err, 'Curlirize error:\n%s', command);
        return;
      }
      this.logService.info('Curlirize:\n%s', command);
    });
  }

  async stop(client: AxiosInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Implement
  }

  buildAgent(opt: AgentOptions & HttpProxyConfig): HttpAgent {
    const proxyBody: any = { host: opt.host, port: toInt(opt.port) };
    if (opt.auth) proxyBody.auth = `${opt.auth.username}:${opt.auth.password}`;
    return {
      httpAgent: new HttpProxyAgent({ ...opt, ...proxyBody }),
      httpsAgent: new HttpsProxyAgent({ ...opt, ...proxyBody }),
    };
  }

  @HttpMetricDecorator()
  async request<T = any>(config: HttpRequest, conId: string = DEFAULT_CON_ID): Promise<HttpResponse<T>> {
    const clientConfig = this.getConfig(conId);
    const cf: AxiosRequestConfig = mergeDeep({}, clientConfig, config, {
      paramsSerializer: config.serializer && {
        encode: (params: Record<string, any>) => qs.stringify(params, { arrayFormat: 'brackets' }),
      },
      curlirize: toBool(config.curlirize, clientConfig.curlirize),
      'axios-retry': config.axiosRetry,
    });

    const proxy = clientConfig.proxy || config.proxy || null;
    if (proxy) {
      Object.assign(cf, this.buildAgent(proxy));
      delete cf.proxy;
    }

    return this.getClient(conId).request<T>(cf);
  }

  @HttpMetricDecorator()
  async upload<T = any>(config: HttpFormRequest, conId: string = DEFAULT_CON_ID): Promise<HttpResponse<T>> {
    const formData = new FormData();
    Object.keys(config.data).map(key => toArray(config.data[key]).map(v => formData.append(key, v, 'file')));

    const clientConfig = this.getConfig(conId);
    const cf: AxiosRequestConfig = mergeDeep({}, clientConfig, config, {
      method: 'POST',
      headers: { ...config.headers, 'Content-Type': 'multipart/form-data' },
      data: formData,
      paramsSerializer: config.serializer && {
        encode: (params: Record<string, any>) => qs.stringify(params, { arrayFormat: 'brackets' }),
      },
      curlirize: toBool(config.curlirize, clientConfig.curlirize),
      'axios-retry': config.axiosRetry,
    });

    const proxy = clientConfig.proxy || config.proxy || null;
    if (proxy) {
      Object.assign(cf, this.buildAgent(proxy));
      delete cf.proxy;
    }

    return this.getClient(conId).request<T>(cf);
  }
}
