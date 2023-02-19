import { Client } from '@joktec/core';
import { EsGetResponse, EsSearchRequest, EsSearchResponse, EsWriteResponse } from './models';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { ElasticConfig } from './elastic.config';

export interface ElasticClient extends Client<ElasticConfig, NestHttpService> {
  search<TDoc = any, TAgg = any>(
    index: string,
    req: EsSearchRequest,
    conId?: string,
  ): Promise<EsSearchResponse<TDoc, TAgg>>;

  index<TDoc = any>(id: string, index: string, document: TDoc, conId?: string): Promise<EsWriteResponse>;

  get<TDoc = any>(id: string, index: string, conId?: string): Promise<EsGetResponse<TDoc>>;

  delete<TDoc = any>(id: string, index: string, conId?: string): Promise<EsWriteResponse>;
}
