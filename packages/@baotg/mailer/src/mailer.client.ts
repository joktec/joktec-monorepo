import { Client } from '@baotg/core';
import { MailerConfig } from './mailer.config';
import { MailerSendRequest, MailerSendResponse } from './models';
import { MailgunService, SendgridService } from './services';

export type Mailer = MailgunService | SendgridService;

export interface IMailerClient {
  send(req: MailerSendRequest, conId?: string): Promise<MailerSendResponse>;
}

export interface MailerClient extends IMailerClient, Client<MailerConfig, Mailer> {}
