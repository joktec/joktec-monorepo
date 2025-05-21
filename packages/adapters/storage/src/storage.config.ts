import { AwsBaseAssumeRoleConfig, AwsBaseConfig } from '@joktec/core';
import { IsBoolean, IsInt, IsOptional, IsString, IsTypes } from '@joktec/utils';
import { StorageACL } from './models';

export const DEFAULT_CONTENT_TYPE = 'application/octet-stream';

export class StorageAssumeRoleConfig extends AwsBaseAssumeRoleConfig {
  constructor(props?: Partial<StorageAssumeRoleConfig>) {
    super(props);
    Object.assign(this, props);
  }
}

export class StorageConfig extends AwsBaseConfig {
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
