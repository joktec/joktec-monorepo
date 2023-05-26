import { ClientConfig, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, toBool, toInt, Type } from '@joktec/core';

export enum MailerServiceType {
  SELF = 'self',
  MAILGUN = 'mailgun',
  SENDGRID = 'sendgrid',
  MAILCHIMP = 'mailchimp',
  ZOHO = 'zoho',
}

export class MailerAuth {
  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsNotEmpty()
  pass!: string;

  constructor(props: MailerAuth) {
    Object.assign(this, props);
  }
}

export class MailerConfig extends ClientConfig {
  @IsNotEmpty()
  @IsNotEmpty()
  service: MailerServiceType = MailerServiceType.SELF;

  @IsString()
  @IsNotEmpty()
  host!: string;

  @IsNumber()
  @IsNotEmpty()
  port!: number;

  @IsBoolean()
  @IsNotEmpty()
  secure!: boolean;

  @Type(() => MailerAuth)
  @IsNotEmpty()
  auth!: MailerAuth;

  @IsString()
  @IsOptional()
  sender?: string;

  @IsString()
  @IsOptional()
  templateDir?: string;

  constructor(props: MailerConfig) {
    super(props);
    const transport = MailerTransport[props?.service];
    Object.assign(this, {
      ...props,
      host: props?.host || transport?.host,
      port: toInt(props?.port || transport?.port, 587),
      secure: toBool(props?.secure, false),
      templateDir: props?.templateDir || '/templates',
      auth: new MailerAuth({
        user: props?.auth?.user || transport?.user || '',
        pass: props?.auth?.pass,
      }),
    });
  }
}

export const MailerTransport = {
  [MailerServiceType.MAILGUN]: {
    host: 'smtp.mailgun.org',
    port: 587,
    user: 'api',
  },
  [MailerServiceType.SENDGRID]: {
    host: 'smtp.sendgrid.net',
    port: 587,
    user: 'apikey',
  },
  [MailerServiceType.MAILCHIMP]: {
    host: 'smtp.mandrillapp.com',
    port: 587,
    user: 'apikey',
  },
  [MailerServiceType.ZOHO]: {
    host: 'smtppro.zoho.com',
    port: 465,
  },
};
