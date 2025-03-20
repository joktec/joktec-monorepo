import { IsTypes } from '@joktec/core';
import { IsBoolean, IsNumber, IsOptional, IsString } from '@joktec/utils';

export class NotifierApnToken {
  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  keyId?: string;

  @IsOptional()
  @IsString()
  teamId?: string;

  constructor(props: NotifierApnToken) {
    Object.assign(this, props);
  }
}

export class NotifierApn {
  @IsOptional()
  @IsTypes(NotifierApnToken)
  token?: NotifierApnToken;

  @IsOptional()
  @IsString()
  cert?: string;

  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsTypes('string[]')
  ca?: string[];

  @IsOptional()
  @IsString()
  pfx?: string;

  @IsOptional()
  @IsString()
  passphrase?: string;

  @IsOptional()
  @IsBoolean()
  production?: boolean = false;

  @IsOptional()
  @IsBoolean()
  voip?: boolean;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  port?: number;

  @IsOptional()
  @IsBoolean()
  rejectUnauthorized?: boolean;

  @IsOptional()
  @IsNumber()
  connectionRetryLimit?: number;

  @IsOptional()
  @IsNumber()
  cacheLength?: number;

  @IsOptional()
  @IsNumber()
  connectionTimeout?: number;

  @IsOptional()
  @IsBoolean()
  autoAdjustCache?: boolean;

  @IsOptional()
  @IsNumber()
  maxConnections?: number;

  @IsOptional()
  @IsNumber()
  minConnections?: number;

  @IsOptional()
  @IsNumber()
  connectTimeout?: number;

  @IsOptional()
  @IsBoolean()
  buffersNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  fastMode?: boolean;

  @IsOptional()
  @IsBoolean()
  disableNagle?: boolean;

  @IsOptional()
  @IsBoolean()
  disableEPIPEFix?: boolean;

  constructor(props: NotifierApn) {
    Object.assign(this, props);
    if (props?.token) this.token = new NotifierApnToken(props.token);
  }
}
