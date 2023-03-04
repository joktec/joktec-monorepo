import { Exception, HttpStatus, InternalServerException, RuntimeException } from '@joktec/core';
import { AxiosError } from 'axios';

export function httpExceptionHandler(err: AxiosError): Exception {
  // The request was made and the server responded with a status code that falls out of the range of 2xx
  if (err?.response) {
    const status: number = err.response?.status;
    if (Object.values(HttpStatus).includes(status)) {
      return new RuntimeException(err.response.statusText, status, err.response.data);
    }
  }

  // The request was made but no response was received `error.request`
  // is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
  // [OR] Something happened in setting up the request that triggered an Error
  return new InternalServerException(err.message ?? 'Unknown', err?.request || err);
}
