import { Client } from '@joktec/core';
import { Transporter } from 'nodemailer';
import { MailerConfig } from './mailer.config';
import { MailerSendRequest, MailerSendResponse, MailerSendTemplate } from './models';

export type Mailer = Transporter;

export interface MailerClient extends Client<MailerConfig, Mailer> {
  compile(req: MailerSendTemplate, conId?: string): Promise<string>;

  send(req: MailerSendRequest, conId?: string): Promise<MailerSendResponse>;
}
