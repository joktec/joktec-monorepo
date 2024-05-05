import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from '@joktec/core';
import { StorageACL } from './models';

export const DEFAULT_CONTENT_TYPE = 'application/octet-stream';

export class StorageConfig extends ClientConfig {
  @IsString()
  @IsOptional()
  region?: string = '';

  @IsString()
  @IsOptional()
  accessKey?: string = '';

  @IsString()
  @IsNotEmpty()
  secretKey!: string;

  @IsString()
  @IsNotEmpty()
  endpoint!: string;

  @IsString()
  @IsOptional()
  sessionToken?: string;

  @IsString()
  @IsNotEmpty()
  bucket?: string;

  @IsBoolean()
  @IsOptional()
  checkBucket?: boolean;

  @IsString()
  @IsOptional()
  linkFormat?: string = '';

  @IsString()
  @IsOptional()
  namespace?: string;

  @IsString()
  @IsOptional()
  acl?: StorageACL = StorageACL.PUBLIC_READ;

  @IsBoolean()
  @IsOptional()
  useDualstack?: boolean = false;

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
  sslEnabled?: boolean = false;

  @IsBoolean()
  @IsOptional()
  s3ForcePathStyle?: boolean = false;

  @IsInt()
  @IsOptional()
  partSize?: number;

  @IsOptional()
  transport?: object;

  constructor(props: StorageConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      linkFormat: props?.linkFormat || props?.endpoint,
    });
  }

  public buildLink(key: string, bucket: string = ''): string {
    return this.linkFormat
      ?.replace('<bucket>', bucket || this.bucket)
      ?.replace('<key>', key)
      ?.replace('<region>', this.region || '')
      ?.replace('<namespace>', this.namespace || '');
  }
}
