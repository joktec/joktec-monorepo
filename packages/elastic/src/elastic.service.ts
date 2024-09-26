import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable, toBool } from '@joktec/core';
import { HttpRequest, HttpService } from '@joktec/http';
import mergeDeep from 'merge-deep';
import { ElasticClient } from './elastic.client';
import { ElasticConfig } from './elastic.config';
import {
  EsDeleteRequest,
  EsGetRequest,
  EsGetResponse,
  EsIndexRequest,
  EsSearchRequest,
  EsSearchResponse,
  EsWriteResponse,
} from './models';

@Injectable()
export class ElasticService extends AbstractClientService<ElasticConfig, HttpService> implements ElasticClient {
  @Inject() private httpService: HttpService;

  constructor() {
    super('elastic', ElasticConfig);
  }

  protected async init(config: ElasticConfig): Promise<HttpService> {
    config.getRetryConfig(this.logService);
    return this.httpService;
  }

  async start(client: HttpService, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: HttpService, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async search<TDoc = any, TAgg = any>(
    req: EsSearchRequest,
    conId: string = DEFAULT_CON_ID,
  ): Promise<EsSearchResponse<TDoc, TAgg>> {
    const config: HttpRequest = mergeDeep({}, this.getConfig(conId), {
      url: `${req.index}/_search`,
      method: 'GET',
      data: { ...req },
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
      curlirize: toBool(req.curlirize, false),
    });
    const res = await this.getClient(conId).request<EsSearchResponse<TDoc, TAgg>>(config);
    return res.data;
  }

  async index<TDoc = any>(req: EsIndexRequest<TDoc>, conId: string = DEFAULT_CON_ID): Promise<EsWriteResponse> {
    const config: HttpRequest = mergeDeep({}, this.getConfig(conId), {
      url: `${req.index}/_doc/${req.id}`,
      method: 'POST',
      data: req.doc,
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
      curlirize: toBool(req.curlirize, false),
    });
    const res = await this.getClient(conId).request<EsWriteResponse>(config);
    return res.data;
  }

  async get<TDoc = any>(req: EsGetRequest, conId: string = DEFAULT_CON_ID): Promise<EsGetResponse<TDoc>> {
    const config: HttpRequest = mergeDeep({}, this.getConfig(conId), {
      url: `${req.index}/_doc/${req.id}`,
      method: 'GET',
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
      curlirize: toBool(req.curlirize, false),
    });
    const res = await this.getClient(conId).request<EsGetResponse<TDoc>>(config);
    return res.data;
  }

  async delete(req: EsDeleteRequest, conId: string = DEFAULT_CON_ID): Promise<EsWriteResponse> {
    const config: HttpRequest = mergeDeep({}, this.getConfig(conId), {
      url: `${req.index}/_doc/${req.id}`,
      method: 'DELETE',
      params: { pretty: true },
      headers: { 'Content-Type': 'application/json' },
      curlirize: toBool(req.curlirize, false),
    });
    const res = await this.getClient(conId).request<EsWriteResponse>(config);
    return res.data;
  }
}
