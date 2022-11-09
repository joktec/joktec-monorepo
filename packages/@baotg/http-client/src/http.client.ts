import { Client } from '@jobhopin/core';
import { Observable } from 'rxjs';
import { HttpClientConfig } from './http-client.config';
import { HttpClientRequest, HttpClientResponse } from './models';

export interface HttpClient extends Client<HttpClientConfig> {
  request<T = any>(config: HttpClientRequest, conId?: string): Observable<HttpClientResponse<T>>;
}
