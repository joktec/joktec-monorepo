import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable } from '@joktec/core';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import mergeDeep from 'merge-deep';
import { HttpConfig } from './http.config';
import { HttpClient } from './http.client';
import { HttpMetricDecorator } from './http.metric';
import { HttpFormData, HttpProxy, HttpRequest, HttpResponse } from './models';
import FormData from 'form-data';

@Injectable()
export class HttpService extends AbstractClientService<HttpConfig, NestHttpService> implements HttpClient {
  @Inject() private httpService: NestHttpService;

  constructor() {
    super('http', HttpConfig);
  }

  async init(config: HttpConfig): Promise<NestHttpService> {
    config.onRetryAttempt(this.logService);
    return this.httpService;
  }

  async start(client: NestHttpService, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Implement
  }

  async stop(client: NestHttpService, conId: string = DEFAULT_CON_ID): Promise<void> {
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
  request<T = any>(config: HttpRequest, conId: string = DEFAULT_CON_ID): Observable<HttpResponse<T>> {
    const proxyConfig = this.buildProxy(config.url, config.proxy);
    const cf: AxiosRequestConfig = mergeDeep(cloneDeep(this.getConfig(conId)), config, proxyConfig);
    return this.httpService.request<T>(cf as any) as any;
  }

  @HttpMetricDecorator()
  upload<T = any>(
    config: HttpRequest,
    data: HttpFormData,
    conId: string = DEFAULT_CON_ID,
  ): Observable<HttpResponse<T>> {
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

    return this.httpService.request<T>(cf as any) as any;
  }
}
