import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsTypes } from '@baotg/core';
import AWS from 'aws-sdk';

class StorageCredentials {
  @IsString()
  @IsNotEmpty()
  accessKeyId!: string;

  @IsString()
  @IsNotEmpty()
  secretAccessKey: string;
}

export class StorageConfig extends ClientConfig implements AWS.S3.Types.ClientConfiguration {
  @IsString()
  @IsNotEmpty()
  bucket!: string;

  @IsString()
  @IsNotEmpty()
  region!: string;

  @IsString()
  @IsOptional()
  endpoint?: string;

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

  @IsTypes([StorageCredentials])
  @IsNotEmpty()
  credentials!: StorageCredentials;

  constructor(props: StorageConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      credentials: { ...props.credentials },
    });
  }
}
