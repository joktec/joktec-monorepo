import { ClientConfig, IsNotEmpty, IsOptional, IsString } from '@joktec/core';

export enum MailerServiceType {
  MAILGUN = 'mailgun',
  SENDGRID = 'sendgrid',
  SES = 'ses',
  MAILCHIMP = 'mailchimp',
}

export class MailerConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  service!: MailerServiceType;

  @IsString()
  @IsNotEmpty()
  apiKey!: string;

  @IsString()
  @IsNotEmpty()
  domain!: string;

  @IsString()
  @IsOptional()
  sender?: string;

  @IsString()
  @IsOptional()
  templateDir?: string;

  constructor(props: MailerConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      templateDir: props.templateDir || '/templates',
    });
  }
}
