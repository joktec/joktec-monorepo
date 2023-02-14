import { ClientConfig, IsNotEmpty, IsOptional, IsString } from '@baotg/core';

export enum MailerSource {
  MAILGUN = 'mailgun',
  SENDGRID = 'sendgrid',
}

export class MailerConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  source!: MailerSource;

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
  templateId?: string;

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
