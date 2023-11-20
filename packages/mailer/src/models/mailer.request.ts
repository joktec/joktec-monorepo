import Mail from 'nodemailer/lib/mailer';
import { MailerEngine } from '../mailer.config';
import { EjsOptions, HandlebarOptions, PugOptions } from '../stores';

export interface MailerSendTemplate {
  name: string;
  context: { [key: string]: any };
  engine?: MailerEngine;
  options?: HandlebarOptions | PugOptions | EjsOptions;
}

export interface MailerSendRequest extends Mail.Options {
  template?: MailerSendTemplate;
}
