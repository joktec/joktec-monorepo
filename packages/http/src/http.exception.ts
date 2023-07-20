import { Exception, HttpStatus, InternalServerException } from '@joktec/core';
import { AxiosError } from 'axios';

export class CustomHttpException extends InternalServerException {
  constructor(message: string, data: any = null) {
    super(message, data);
  }
}

export function httpExceptionHandler(err: AxiosError): Exception {
  // The request was made and the server responded with a status code that falls out of the range of 2xx
  if (err?.response) {
    const status: number = err.response?.status;
    if (Object.values(HttpStatus).includes(status)) {
      return new CustomHttpException(err.response.statusText, err.response);
    }
  }

  // The request was made but no response was received `error.request`
  // is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
  // [OR] Something happened in setting up the request that triggered an Error
  return new CustomHttpException(err.message ?? 'Unknown', err?.request || err);
}
