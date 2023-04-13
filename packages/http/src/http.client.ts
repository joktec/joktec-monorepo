import { Client } from '@joktec/core';
import { AxiosInstance } from 'axios';
import { HttpConfig } from './http.config';
import { HttpFormData, HttpRequest, HttpResponse } from './models';

export interface HttpClient extends Client<HttpConfig, AxiosInstance> {
  request<T = any>(config: HttpRequest, conId?: string): Promise<HttpResponse<T>>;

  upload<T = any>(config: HttpRequest, data: HttpFormData, conId?: string): Promise<HttpResponse<T>>;
}
