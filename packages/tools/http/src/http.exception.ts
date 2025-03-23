import { InternalServerException } from '@joktec/core';
import { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';

export interface IHttpException {
  data?: any;
  status?: number;
  statusText?: string;
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config?: InternalAxiosRequestConfig<any>;
  request?: any;
  code?: string;
}

export class HttpClientException extends InternalServerException<IHttpException> {
  constructor(message: string, data: IHttpException = null) {
    super(message, data);
  }
}
