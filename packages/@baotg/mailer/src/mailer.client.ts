import { Client } from '@baotg/core';
import { MailerConfig } from './mailer.config';
import { Mailgun } from 'mailgun-js';
import { MailerSendRequest, MailerSendResponse } from './models';

export interface MailerClient extends Client<MailerConfig, Mailgun> {
  send(req: MailerSendRequest, conId?: string): Promise<MailerSendResponse>;
}
