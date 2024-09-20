import { Exception, HttpStatus, InternalServerException } from '@joktec/core';
import { AxiosError, AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';

export interface IHttpException {
  data?: any;
  status?: number;
  statusText?: string;
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config?: InternalAxiosRequestConfig<any>;
  request?: any;
}

export class HttpClientException extends InternalServerException<IHttpException> {
  constructor(message: string, data: IHttpException = null) {
    super(message, data);
  }
}

export function httpExceptionHandler(err: AxiosError): Exception {
  // The request was made and the server responded with a status code that falls out of the range of 2xx
  if (err?.response) {
    const status: number = err.response?.status;
    if (Object.values(HttpStatus).includes(status)) {
      return new HttpClientException(err.response.statusText, err.response);
    }
  }

  // The request was made but no response was received `error.request`
  // is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
  // [OR] Something happened in setting up the request that triggered an Error
  return new HttpClientException(err.message ?? 'Unknown', { request: err?.request });
}
