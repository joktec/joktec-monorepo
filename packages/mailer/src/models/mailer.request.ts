import { Readable } from 'stream';
import Mail, { Address, Attachment, AttachmentLike } from 'nodemailer/lib/mailer';
import { MailerEngine } from '../mailer.config';
import { EjsOptions, HandlebarOptions, PugOptions } from '../stores';

export interface MailerSendTemplate {
  name: string;
  context: { [key: string]: any };
  engine?: MailerEngine;
  options?: HandlebarOptions | PugOptions | EjsOptions;
}

export interface MailerSendRequest extends Mail.Options {
  from?: string | Address;
  sender?: string | Address;
  to?: string | Address | Array<string | Address>;
  cc?: string | Address | Array<string | Address>;
  bcc?: string | Address | Array<string | Address>;
  replyTo?: string | Address | Array<string | Address>;
  inReplyTo?: string | Address;
  references?: string | string[];
  subject?: string;
  text?: string | Buffer | Readable | AttachmentLike;
  html?: string | Buffer | Readable | AttachmentLike;
  attachments?: Attachment[];
  priority?: 'high' | 'normal' | 'low';
  template?: MailerSendTemplate;
}
