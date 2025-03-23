import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';

type EsOptions = { curlirize?: boolean };

export type EsSearchRequest = { index: string; search: SearchRequest } & EsOptions;

export type EsIndexRequest<TDoc> = { id: string; index: string; doc: TDoc } & EsOptions;

export type EsGetRequest = { id: string; index: string } & EsOptions;

export type EsDeleteRequest = { id: string; index: string } & EsOptions;
