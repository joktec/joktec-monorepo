import {
  ClientConfig,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  LogService,
  toBool,
  toInt,
  Type,
} from '@joktec/core';
import shared from 'nodemailer/lib/shared';

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
  service?: MailerServiceType;

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
      service: props?.service || MailerServiceType.SELF,
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

  bindingLogger(logger: LogService): shared.Logger {
    return {
      level: lv => logger.trace(lv),
      trace: params => logger.trace(params, '`%s` Mailer client connecting', this.conId),
      debug: params => logger.debug(params, '`%s` Mailer client connecting', this.conId),
      info: params => logger.info(params, '`%s` Mailer client connecting', this.conId),
      warn: params => logger.warn(params, '`%s` Mailer client connecting', this.conId),
      error: params => logger.error(params, '`%s` Mailer client connecting', this.conId),
      fatal: params => logger.fatal(params, '`%s` Mailer client connecting', this.conId),
    };
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
