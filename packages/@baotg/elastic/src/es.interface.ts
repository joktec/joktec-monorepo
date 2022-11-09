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

export interface EsInterface {
  search<TDoc = any, TAgg = any>(req: EsSearchRequest, conId?: string): Promise<EsSearchResponse<TDoc, TAgg>>;

  get<TDoc = any>(req: EsGetRequest, conId?: string): Promise<EsGetResponse<TDoc>>;

  index<TDoc = any>(req: EsIndexRequest<TDoc>, conId?: string): Promise<ESIndexResponse>;

  update<TDoc = any>(req: EsUpdateRequest<TDoc>, conId?: string): Promise<EsUpdateResponse<TDoc>>;

  delete<TDoc = any>(req: EsDeleteRequest, conId?: string): Promise<EsDeleteResponse>;
}
