import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, AbstractClientService, DEFAULT_CON_ID } from '@baotg/core';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { HttpClientConfig } from './http-client.config';
import { HttpClientMetricDecorator } from './http-client.metric';
import { HttpClient } from './http.client';
import { HttpClientRequest } from './models';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import mergeDeep from 'merge-deep';

@Injectable()
export class HttpClientService extends AbstractClientService<HttpClientConfig, HttpService> implements HttpClient {
  @Inject()
  private httpService: HttpService;

  constructor() {
    super('httpClient', HttpClientConfig);
  }

  async init(config: HttpClientConfig): Promise<HttpService> {
    config.onRetryAttempt(this.logService);
    return this.httpService;
  }

  async stop(client: HttpService): Promise<void> {
    // Implement
  }

  async start(client: HttpService): Promise<void> {
    // Implement
  }

  @HttpClientMetricDecorator()
  request<T = any>(config: HttpClientRequest, conId: string = DEFAULT_CON_ID): Observable<AxiosResponse<T>> {
    const cf: AxiosRequestConfig = mergeDeep(cloneDeep(this.getConfig(conId)), config);
    if (cf.proxy) {
      const url = new URL(config.url);
      if (cf.proxy.protocol === 'https' || url.protocol === 'https') {
        cf.httpsAgent = new HttpsProxyAgent({
          host: cf.proxy.host,
          port: cf.proxy.port,
          auth: `${cf.proxy.auth.username}:${cf.proxy.auth.password}`,
        });
      } else {
        cf.httpAgent = new HttpProxyAgent({
          host: cf.proxy.host,
          port: cf.proxy.port,
          auth: `${cf.proxy.auth.username}:${cf.proxy.auth.password}`,
        });
      }
      cf.proxy = false;
    }
    return this.httpService.request<T>(cf as any) as Observable<AxiosResponse<T>>;
  }
}
