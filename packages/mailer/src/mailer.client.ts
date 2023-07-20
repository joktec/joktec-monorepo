import { Client } from '@joktec/core';
import { Transporter } from 'nodemailer';
import { MailerConfig } from './mailer.config';
import { MailerSendRequest, MailerSendResponse } from './models';

export type Mailer = Transporter;

export interface MailerClient extends Client<MailerConfig, Mailer> {
  send(req: MailerSendRequest, conId?: string): Promise<MailerSendResponse>;

  buildHtml(filename: string, variables?: { [key: string]: any }, conId?: string): Promise<string>;
}
