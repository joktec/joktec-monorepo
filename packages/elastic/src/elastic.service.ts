import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable } from '@joktec/core';
import { HttpRequest, HttpService } from '@joktec/http';
import { EsGetResponse, EsSearchRequest, EsSearchResponse, EsWriteResponse } from './models';
import { ElasticConfig } from './elastic.config';
import { ElasticClient } from './elastic.client';
import mergeDeep from 'merge-deep';
import { cloneDeep } from 'lodash';

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

  private getQueryUrl(id: string, index: string, conId: string = DEFAULT_CON_ID): string {
    const baseUrl = this.getConfig(conId).buildUrl(index);
    return `${baseUrl}/_doc/${id}`;
  }

  async search<TDoc = any, TAgg = any>(
    index: string,
    req: EsSearchRequest,
    conId: string = DEFAULT_CON_ID,
  ): Promise<EsSearchResponse<TDoc, TAgg>> {
    const config: HttpRequest = mergeDeep(cloneDeep(this.getConfig(conId)), {
      url: this.getConfig(conId).buildUrl(index) + '/_search',
      method: 'GET',
      data: { ...req },
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
    });
    this.logService.debug('Query URL: %s', config.url);
    const res = await this.getClient(conId).request<EsSearchResponse<TDoc, TAgg>>(config);
    return res.data;
  }

  async index<TDoc = any>(
    id: string,
    index: string,
    doc: TDoc,
    conId: string = DEFAULT_CON_ID,
  ): Promise<EsWriteResponse> {
    const config: HttpRequest = mergeDeep(cloneDeep(this.getConfig(conId)), {
      url: this.getQueryUrl(id, index, conId),
      method: 'POST',
      data: doc,
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
    });
    this.logService.debug('Query URL: %s', config.url);
    const res = await this.getClient(conId).request<EsWriteResponse>(config);
    return res.data;
  }

  async get<TDoc = any>(id: string, index: string, conId: string = DEFAULT_CON_ID): Promise<EsGetResponse<TDoc>> {
    const config: HttpRequest = mergeDeep(cloneDeep(this.getConfig(conId)), {
      url: this.getQueryUrl(id, index, conId),
      method: 'GET',
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
    });
    this.logService.debug('Query URL: %s', config.url);
    const res = await this.getClient(conId).request<EsGetResponse<TDoc>>(config);
    return res.data;
  }

  async delete<TDoc = any>(id: string, index: string, conId: string = DEFAULT_CON_ID): Promise<EsWriteResponse> {
    const config: HttpRequest = mergeDeep(cloneDeep(this.getConfig(conId)), {
      url: this.getQueryUrl(id, index, conId),
      method: 'DELETE',
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
    });
    this.logService.debug('Query URL: %s', config.url);
    const res = await this.getClient(conId).request<EsWriteResponse>(config);
    return res.data;
  }
}
