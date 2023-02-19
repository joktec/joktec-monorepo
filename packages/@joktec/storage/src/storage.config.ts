import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsTypes, toBool } from '@joktec/core';
import { StorageACL } from './models';

class StorageCredentials {
  @IsString()
  @IsNotEmpty()
  accessKeyId!: string;

  @IsString()
  @IsNotEmpty()
  secretAccessKey: string;

  @IsString()
  @IsOptional()
  sessionToken?: string;
}

export class StorageConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  region!: string;

  @IsTypes([StorageCredentials])
  @IsNotEmpty()
  credentials!: StorageCredentials;

  @IsString()
  @IsNotEmpty()
  bucket?: string;

  @IsString()
  @IsOptional()
  endpoint?: string;

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
      region: props.region || 'ap-southeast-1',
      acl: props.acl || StorageACL.PUBLIC_READ,
      credentials: { ...props.credentials },
      sslEnabled: toBool(props.sslEnabled, false),
      s3ForcePathStyle: toBool(props.s3ForcePathStyle, false),
      useDualstack: toBool(props.useDualstack, false),
    });
  }
}
