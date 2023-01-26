import { Exception, ExceptionStatus, InternalServerException, RuntimeException, toInt } from '@baotg/core';
import { startCase, lowerCase } from 'lodash';
import { AxiosError } from 'axios';

export function httpExceptionHandler(err: AxiosError): Exception {
  // The request was made and the server responded with a status code that falls out of the range of 2xx
  if (err?.response) {
    const status: number = err.response?.status;
    for (const statusKey in ExceptionStatus) {
      if (status === toInt(ExceptionStatus[statusKey])) {
        const msg = startCase(lowerCase(statusKey));
        return new RuntimeException(msg, status, err.response?.data || err);
      }
    }
  }

  // The request was made but no response was received `error.request`
  // is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
  // [OR] Something happened in setting up the request that triggered an Error
  return new InternalServerException(err.message ?? 'Unknown', err?.request || err);
}
