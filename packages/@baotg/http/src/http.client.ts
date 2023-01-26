import { Client } from '@baotg/core';
import { Observable } from 'rxjs';
import { HttpConfig } from './http.config';
import { HttpFormData, HttpRequest, HttpResponse } from './models';

export interface HttpClient extends Client<HttpConfig> {
  request<T = any>(config: HttpRequest, conId?: string): Observable<HttpResponse<T>>;

  upload<T = any>(config: HttpRequest, data: HttpFormData, conId?: string): Observable<HttpResponse<T>>;
}
