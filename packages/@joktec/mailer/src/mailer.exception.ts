import { BadRequestException } from '@joktec/core';

export class MailerException<T = any> extends BadRequestException {
  constructor(message: string, data: T = null) {
    super(message, data);
  }
}
