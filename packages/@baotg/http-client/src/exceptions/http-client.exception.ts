import { startCase, lowerCase } from 'lodash';
import { AxiosError } from 'axios';
import { ExceptionStatus, Exception, RuntimeException, InternalServerException } from '@baotg/core';

export function httpClientExceptionHandler(err: AxiosError): Exception {
  const status = err?.response?.status;

  if (status) {
    for (const message in ExceptionStatus) {
      if (status === ExceptionStatus[message]) {
        const msg = startCase(lowerCase(message));
        return new RuntimeException(msg, startCase(message), err.response);
      }
    }
  }

  return new InternalServerException(err.code ?? 'Unknown', err);
}
