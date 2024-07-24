import { AgentOptions } from 'http';
import { Client } from '@joktec/core';
import { AxiosInstance } from 'axios';
import { HttpConfig, HttpProxyConfig } from './http.config';
import { HttpAgent, HttpFormData, HttpRequest, HttpResponse } from './models';

export interface HttpClient extends Client<HttpConfig, AxiosInstance> {
  buildAgent(opt: AgentOptions & HttpProxyConfig): HttpAgent;

  request<T = any>(config: HttpRequest, conId?: string): Promise<HttpResponse<T>>;

  upload<T = any>(config: HttpRequest, data: HttpFormData, conId?: string): Promise<HttpResponse<T>>;
}
