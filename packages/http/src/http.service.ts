import { AgentOptions } from 'http';
import net from 'net';
import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@joktec/core';
import { HttpMethod, toArray, toBool } from '@joktec/utils';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import curlirize from 'axios-curlirize';
import axiosRetry from 'axios-retry';
import FormData from 'form-data';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { merge } from 'lodash';
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

  public async checkProxy(proxy: HttpProxyConfig, timeout: number = 5000): Promise<[boolean, string]> {
    return new Promise((resolve, _) => {
      const { host, port } = proxy;

      const socket = new net.Socket();
      const onError = (err: any) => {
        socket.destroy();
        resolve([false, 'Proxy Connection Error: ' + err.message]);
      };

      socket.setTimeout(timeout);
      socket.once('error', onError);
      socket.once('timeout', () => onError(new Error('Connection Timeout')));
      socket.connect(port, host, () => {
        socket.end();
        resolve([true, 'OK']);
      });
    });
  }

  public buildAgent(proxy: HttpProxyConfig, opts?: AgentOptions): HttpAgent {
    const { protocol, host, port, auth } = proxy;
    const url = new URL(`${protocol}://${host}:${port}`);
    if (auth?.username && auth?.password) {
      url.username = auth.username;
      url.password = auth.password;
    }

    const { keepAlive = true, timeout, maxSockets } = proxy;
    const options = Object.assign({ keepAlive, timeout, maxSockets }, opts);
    return {
      httpAgent: new HttpProxyAgent(url, options),
      httpsAgent: new HttpsProxyAgent(url, options),
    };
  }

  public buildConfig(config: HttpRequest, conId: string = DEFAULT_CON_ID): AxiosRequestConfig {
    const clientConfig = this.getConfig(conId);
    const cf: AxiosRequestConfig = merge({}, clientConfig, config, {
      paramsSerializer: config.serializer && {
        encode: (params: Record<string, any>) => qs.stringify(params, { arrayFormat: 'brackets' }),
      },
      curlirize: toBool(config.curlirize, clientConfig.curlirize),
    });

    if (cf.baseURL && cf.baseURL.endsWith('/')) {
      cf.baseURL = cf.baseURL.slice(0, -1);
    }

    const proxy = clientConfig.proxy || config.proxy || null;
    if (proxy) {
      Object.assign(cf, this.buildAgent(proxy));
      delete cf.proxy;
    }

    if (config.authorization) {
      if (config.authorization.basicAuth) cf.auth = config.authorization.basicAuth;
      if (config.authorization.bearerToken) {
        const bearerToken = config.authorization.bearerToken.replace('Bearer ', '').trim();
        cf.headers['Authorization'] = `Bearer ${bearerToken}`;
      }
      if (config.authorization.apiKey) {
        const { key, value, addTo } = config.authorization.apiKey;
        if (addTo === 'header') cf.headers[key] = value;
        if (addTo === 'query') cf.params[key] = value;
      }
    }

    return cf;
  }

  @HttpMetricDecorator()
  async request<T = any>(config: HttpRequest, conId: string = DEFAULT_CON_ID): Promise<HttpResponse<T>> {
    const cf: AxiosRequestConfig = this.buildConfig(config, conId);
    return this.getClient(conId).request<T>(cf);
  }

  @HttpMetricDecorator()
  async upload<T = any>(config: HttpFormRequest, conId: string = DEFAULT_CON_ID): Promise<HttpResponse<T>> {
    const formData = new FormData();
    Object.keys(config.data).map(key => toArray(config.data[key]).map(v => formData.append(key, v, 'file')));

    const baseConfig = this.buildConfig(config, conId);
    const cf: AxiosRequestConfig = merge({}, baseConfig, {
      method: HttpMethod.POST,
      headers: { ...baseConfig.headers, 'Content-Type': 'multipart/form-data' },
      data: formData,
    });

    return this.getClient(conId).request<T>(cf);
  }
}
