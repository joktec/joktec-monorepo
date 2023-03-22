import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, toBool } from '@joktec/core';
import { StorageACL } from './models';

export class StorageConfig extends ClientConfig {
  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsNotEmpty()
  accessKey!: string;

  @IsString()
  @IsNotEmpty()
  secretKey: string;

  @IsString()
  @IsNotEmpty()
  endpoint!: string;

  @IsString()
  @IsOptional()
  sessionToken?: string;

  @IsString()
  @IsNotEmpty()
  bucket?: string;

  @IsString()
  @IsOptional()
  linkFormat?: string;

  @IsString()
  @IsOptional()
  namespace?: string;

  @IsString()
  @IsOptional()
  acl?: StorageACL;

  @IsBoolean()
  @IsOptional()
  useDualstack?: boolean;

  @IsString()
  @IsOptional()
  apiVersion?: '2006-03-01' | 'latest' | string;

  @IsInt()
  @IsOptional()
  maxRedirects?: number;

  @IsInt()
  @IsOptional()
  maxRetries?: number;

  @IsBoolean()
  @IsOptional()
  sslEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  s3ForcePathStyle?: boolean;

  @IsInt()
  @IsOptional()
  partSize: number;

  @IsOptional()
  transport: object;

  constructor(props: StorageConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      acl: props.acl || StorageACL.PUBLIC_READ,
      sslEnabled: toBool(props.sslEnabled, false),
      s3ForcePathStyle: toBool(props.s3ForcePathStyle, false),
      useDualstack: toBool(props.useDualstack, false),
      linkFormat: props.linkFormat || '',
    });
  }

  public buildLink(key: string, bucket: string = ''): string {
    return this.linkFormat
      .replace('<bucket>', bucket || this.bucket)
      .replace('<key>', key)
      .replace('<region>', this.region || '')
      .replace('<namespace>', this.namespace || '');
  }
}
