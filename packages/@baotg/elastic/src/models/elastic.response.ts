import { GetGetResult, SearchResponseBody, WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';

export type EsSearchResponse<TDoc, TAgg> = SearchResponseBody<TDoc, TAgg>;

export type EsGetResponse<TDoc> = GetGetResult<TDoc>;

export type EsWriteResponse = WriteResponseBase;
