import { AbstractClientService, Injectable, Retry } from '@jobhopin/core';
import { EsConfig } from './es.config';
import { EsInterface } from './es.interface';
import {
  EsDeleteRequest,
  EsDeleteResponse,
  EsGetRequest,
  EsGetResponse,
  EsIndexRequest,
  ESIndexResponse,
  EsSearchRequest,
  EsSearchResponse,
  EsUpdateRequest,
  EsUpdateResponse,
} from './models';
import { Client as EsClient } from '@elastic/elasticsearch';

export const RETRY_OPTS = 'elastic.retry';

@Injectable()
export class EsService extends AbstractClientService<EsConfig, EsClient> implements EsInterface {
  constructor() {
    super('es', EsConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: EsConfig): Promise<EsClient> {
    return new EsClient({
      node: config.url,
      maxRetries: config.maxRetries,
      requestTimeout: config.requestTimeout,
      pingTimeout: config.pingTimeout,
      sniffOnStart: config.sniffOnStart,
      proxy: config.proxy,
      auth: config.auth,
    });
  }

  async stop(client: EsClient): Promise<void> {
    // Do nothing
  }

  async start(client: EsClient): Promise<void> {
    // Do nothing
  }

  search<TDoc = any, TAgg = any>(req: EsSearchRequest, conId?: string): Promise<EsSearchResponse<TDoc, TAgg>> {
    return this.getClient(conId).search(req);
  }

  get<TDoc = any>(req: EsGetRequest, conId?: string): Promise<EsGetResponse<TDoc>> {
    return this.getClient(conId).get(req);
  }

  index<TDoc = any>(req: EsIndexRequest<TDoc>, conId?: string): Promise<ESIndexResponse> {
    return this.getClient(conId).index(req);
  }

  update<TDoc = any>(req: EsUpdateRequest<TDoc>, conId?: string): Promise<EsUpdateResponse<TDoc>> {
    return this.getClient(conId).update(req);
  }

  delete<TDoc = any>(req: EsDeleteRequest, conId?: string): Promise<EsDeleteResponse> {
    return this.getClient(conId).delete(req);
  }
}
