import { InternalServerException } from '@joktec/core';

export class CustomHttpException extends InternalServerException {
  constructor(message: string, data: any = null) {
    super(message, data);
  }
}
