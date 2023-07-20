import { Client } from '@joktec/core';
import { HttpService } from '@joktec/http';
import { ElasticConfig } from './elastic.config';
import { EsGetResponse, EsSearchRequest, EsSearchResponse, EsWriteResponse } from './models';

export interface ElasticClient extends Client<ElasticConfig, HttpService> {
  search<TDoc = any, TAgg = any>(
    index: string,
    req: EsSearchRequest,
    conId?: string,
  ): Promise<EsSearchResponse<TDoc, TAgg>>;

  index<TDoc = any>(id: string, index: string, document: TDoc, conId?: string): Promise<EsWriteResponse>;

  get<TDoc = any>(id: string, index: string, conId?: string): Promise<EsGetResponse<TDoc>>;

  delete<TDoc = any>(id: string, index: string, conId?: string): Promise<EsWriteResponse>;
}
