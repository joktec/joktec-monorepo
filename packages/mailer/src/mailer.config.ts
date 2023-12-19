import os from 'os';
import {
  ClientConfig,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTypes,
  LogService,
} from '@joktec/core';
import { isObject } from 'lodash';
import shared from 'nodemailer/lib/shared';
import { EjsOptions, HandlebarOptions, PugOptions } from './stores';

export enum MailerEngine {
  HBS = 'hbs',
  EJS = 'ejs',
  PUG = 'pug',
}

export class MailerAuth {
  /** Username or Email address */
  @IsString()
  @IsNotEmpty()
  user!: string;

  /** Password */
  @IsString()
  @IsNotEmpty()
  pass!: string;

  constructor(props: MailerAuth) {
    Object.assign(this, props);
  }
}

export class MailerOAuth2 {
  /** Username or Email address */
  @IsString()
  @IsNotEmpty()
  user!: string;

  /** Client ID value */
  @IsString()
  @IsOptional()
  clientId?: string;

  /** Client secret value */
  @IsString()
  @IsOptional()
  clientSecret?: string;

  /** Refresh token for an user */
  @IsString()
  @IsOptional()
  refreshToken?: string;

  /** Endpoint for token generation, defaults to 'https://accounts.google.com/o/oauth2/token' */
  @IsString()
  @IsOptional()
  accessUrl?: string;

  /** An existing valid accessToken */
  @IsString()
  @IsOptional()
  accessToken?: string;

  /** Private key for JSW */
  @IsOptional()
  privateKey?: string | { key: string; passphrase: string };

  /** Optional Access Token expire time in ms */
  @IsInt()
  @IsOptional()
  expires?: number;

  /** Optional TTL for Access Token in seconds */
  @IsInt()
  @IsOptional()
  timeout?: number;

  @IsString()
  @IsOptional()
  serviceClient?: string;

  constructor(props: MailerOAuth2) {
    Object.assign(this, props);
  }
}

export class MailerPreview {
  @IsString()
  @IsNotEmpty()
  dir?: string = os.tmpdir();

  @IsOptional()
  open?: { wait?: boolean; app?: string | string[] } = { wait: false };

  constructor(props?: boolean | MailerPreview) {
    if (isObject(props)) Object.assign(this, props);
  }
}

export class MailerTemplate {
  @IsString()
  @IsOptional()
  dir?: string = './templates';

  @IsEnum(MailerEngine)
  @IsOptional()
  engine?: MailerEngine = MailerEngine.HBS;

  @IsOptional()
  options?: HandlebarOptions | PugOptions | EjsOptions;

  @IsTypes(['boolean', MailerPreview])
  @IsOptional()
  preview?: boolean | MailerPreview;

  constructor(props: MailerTemplate) {
    Object.assign(this, props);
    if (props?.preview) this.preview = new MailerPreview(props?.preview);
  }
}

export class MailerConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  host!: string;

  @IsInt()
  @IsNotEmpty()
  port?: number = 587;

  @IsBoolean()
  @IsNotEmpty()
  secure?: boolean = false;

  @IsTypes([MailerAuth, MailerOAuth2])
  @IsOptional()
  auth?: MailerAuth | MailerOAuth2;

  @IsString()
  @IsOptional()
  sender?: string;

  @IsTypes(MailerTemplate)
  @IsOptional()
  template?: MailerTemplate;

  constructor(props: MailerConfig) {
    super(props);
    Object.assign(this, props);
    if (props?.auth) this.auth = 'pass' in props.auth ? new MailerAuth(props.auth) : new MailerOAuth2(props.auth);
    if (props?.template) this.template = new MailerTemplate(props.template);
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
