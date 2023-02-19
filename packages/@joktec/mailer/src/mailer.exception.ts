import { RuntimeException } from '@joktec/core';

export class MailerException<T = any> extends RuntimeException<T> {
  constructor(message: string, status: string, data: T = null) {
    super(message, status, data);
  }
}

export class MailerTemplateInvalidException extends MailerException {
  constructor(message: string, data: any) {
    super(message, 'MAILER_TEMPLATE_INVALID_EXCEPTION', data);
  }
}

export class MailerServiceNotImplementedException extends MailerException {
  constructor(message: string, data: any) {
    super(message, 'MAILER_SERVICE_NOT_IMPLEMENTED_EXCEPTION', data);
  }
}
