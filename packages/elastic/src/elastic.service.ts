import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable } from '@joktec/core';
import { HttpRequest, HttpService } from '@joktec/http';
import mergeDeep from 'merge-deep';
import { ElasticClient } from './elastic.client';
import { ElasticConfig } from './elastic.config';
import { EsGetResponse, EsSearchRequest, EsSearchResponse, EsWriteResponse } from './models';

@Injectable()
export class ElasticService extends AbstractClientService<ElasticConfig, HttpService> implements ElasticClient {
  @Inject() private httpService: HttpService;

  constructor() {
    super('elastic', ElasticConfig);
  }

  protected async init(config: ElasticConfig): Promise<HttpService> {
    config.onRetryAttempt(this.logService);
    return this.httpService;
  }

  async start(client: HttpService, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: HttpService, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async search<TDoc = any, TAgg = any>(
    index: string,
    req: EsSearchRequest,
    conId: string = DEFAULT_CON_ID,
  ): Promise<EsSearchResponse<TDoc, TAgg>> {
    const config: HttpRequest = mergeDeep({}, this.getConfig(conId), {
      url: `${index}/_search`,
      method: 'GET',
      data: { ...req },
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
    });
    this.logService.debug('Query URL: %s/%s', config.baseURL, config.url);
    const res = await this.getClient(conId).request<EsSearchResponse<TDoc, TAgg>>(config);
    return res.data;
  }

  async index<TDoc = any>(
    id: string,
    index: string,
    doc: TDoc,
    conId: string = DEFAULT_CON_ID,
  ): Promise<EsWriteResponse> {
    const config: HttpRequest = mergeDeep({}, this.getConfig(conId), {
      url: `${index}/_doc/${id}`,
      method: 'POST',
      data: doc,
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
    });
    this.logService.debug('Query URL: %s/%s', config.baseURL, config.url);
    const res = await this.getClient(conId).request<EsWriteResponse>(config);
    return res.data;
  }

  async get<TDoc = any>(id: string, index: string, conId: string = DEFAULT_CON_ID): Promise<EsGetResponse<TDoc>> {
    const config: HttpRequest = mergeDeep({}, this.getConfig(conId), {
      url: `${index}/_doc/${id}`,
      method: 'GET',
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
    });
    this.logService.debug('Query URL: %s/%s', config.baseURL, config.url);
    const res = await this.getClient(conId).request<EsGetResponse<TDoc>>(config);
    return res.data;
  }

  async delete<TDoc = any>(id: string, index: string, conId: string = DEFAULT_CON_ID): Promise<EsWriteResponse> {
    const config: HttpRequest = mergeDeep({}, this.getConfig(conId), {
      url: `${index}/_doc/${id}`,
      method: 'DELETE',
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
    });
    this.logService.debug('Query URL: %s/%s', config.baseURL, config.url);
    const res = await this.getClient(conId).request<EsWriteResponse>(config);
    return res.data;
  }
}
