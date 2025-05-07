import { ClientConfig } from '@joktec/core';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsTypes } from '@joktec/utils';
import { StorageACL } from './models';

export const DEFAULT_CONTENT_TYPE = 'application/octet-stream';

export class StorageAssumeRoleConfig {
  @IsString()
  @IsOptional()
  roleArn?: string;

  @IsString()
  @IsOptional()
  roleSessionName?: string = 'AssumeRoleSession';

  @IsString()
  @IsOptional()
  externalId?: string;

  @IsInt()
  @IsOptional()
  durationSeconds?: number = 3600;

  @IsOptional()
  stsEndpoint?: string;

  constructor(props?: Partial<StorageAssumeRoleConfig>) {
    Object.assign(this, props);
  }
}

export class StorageConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  region?: string = 'ap-southeast-1';

  @IsString()
  @IsOptional()
  accessKey?: string;

  @IsString()
  @IsOptional()
  secretKey?: string;

  @IsString()
  @IsOptional()
  endpoint?: string;

  @IsString()
  @IsOptional()
  sessionToken?: string;

  @IsString()
  @IsOptional()
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
  forcePathStyle?: boolean = false;

  @IsInt()
  @IsOptional()
  partSize?: number;

  @IsOptional()
  transport?: object;

  @IsOptional()
  @IsTypes(StorageAssumeRoleConfig)
  assumeRole?: StorageAssumeRoleConfig;

  constructor(props: StorageConfig) {
    super(props);
    Object.assign(this, { ...props, linkFormat: props?.linkFormat || props?.endpoint });
    if (props.assumeRole) this.assumeRole = new StorageAssumeRoleConfig(props.assumeRole);
  }

  public buildLink(key: string, bucket: string = ''): string {
    return this.linkFormat
      ?.replace('<bucket>', bucket || this.bucket)
      ?.replace('<key>', key)
      ?.replace('<region>', this.region || '')
      ?.replace('<namespace>', this.namespace || '');
  }
}
