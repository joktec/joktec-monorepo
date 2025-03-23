import { Client } from '@joktec/core';
import { HttpService } from '@joktec/http';
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

export interface ElasticClient extends Client<ElasticConfig, HttpService> {
  search<TDoc = any, TAgg = any>(req: EsSearchRequest, conId?: string): Promise<EsSearchResponse<TDoc, TAgg>>;

  index<TDoc = any>(req: EsIndexRequest<TDoc>, conId?: string): Promise<EsWriteResponse>;

  get<TDoc = any>(req: EsGetRequest, conId?: string): Promise<EsGetResponse<TDoc>>;

  delete(req: EsDeleteRequest, conId?: string): Promise<EsWriteResponse>;
}
