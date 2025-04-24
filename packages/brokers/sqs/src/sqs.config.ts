import { ClientConfig } from '@joktec/core';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, toBool, toInt } from '@joktec/utils';

export class SqsConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  region!: string;

  @IsOptional()
  @IsString()
  accessKey?: string;

  @IsOptional()
  @IsString()
  secretKey?: string;

  @IsOptional()
  @IsString()
  sessionToken?: string;

  @IsOptional()
  @IsString()
  endpoint?: string;

  @IsOptional()
  @IsBoolean()
  sslEnabled?: boolean;

  @IsOptional()
  @IsInt()
  maxRetries?: number;

  @IsOptional()
  @IsInt()
  timeout?: number = 30000;

  constructor(props?: SqsConfig) {
    super(props);
    Object.assign(this, {
      region: props.region || 'ap-southeast-1',
      sslEnabled: toBool(props.sslEnabled, true),
      maxRetries: toInt(props.maxRetries, 3),
      timeout: toInt(props.timeout, 30000),
      ...props,
    });
  }
}
