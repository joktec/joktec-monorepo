import {
  DeleteRequest,
  DeleteResponse,
  IndexRequest,
  IndexResponse,
  UpdateRequest,
  UpdateResponse,
} from '@elastic/elasticsearch/lib/api/types';

export type EsIndexRequest<TDoc> = IndexRequest<TDoc>;
export type ESIndexResponse = IndexResponse;

export type EsUpdateRequest<TDoc> = UpdateRequest<TDoc>;
export type EsUpdateResponse<TDoc> = UpdateResponse<TDoc>;

export type EsDeleteRequest = DeleteRequest;
export type EsDeleteResponse = DeleteResponse;
