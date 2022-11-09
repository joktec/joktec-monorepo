import { GetRequest, GetResponse, SearchRequest, SearchResponse } from '@elastic/elasticsearch/lib/api/types';

export type EsGetRequest = GetRequest;

export type EsGetResponse<TDoc> = GetResponse<TDoc>;

export type EsSearchRequest = SearchRequest;

export type EsSearchResponse<TDoc, TAgg> = SearchResponse<TDoc, TAgg>;
