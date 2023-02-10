import { ClientConfig, IsNotEmpty, IsOptional, IsString, IsInt, IsBoolean, toBool } from '@baotg/core';
import mergeDeep from 'merge-deep';
import { ClientOptions } from 'minio';

export class MinioConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  cdnUrl: string;

  @IsString()
  @IsNotEmpty()
  endPoint: string;

  @IsInt()
  @IsNotEmpty()
  port: number;

  @IsString()
  @IsNotEmpty()
  accessKey: string;

  @IsString()
  @IsNotEmpty()
  secretKey: string;

  @IsBoolean()
  @IsOptional()
  useSSL: boolean;

  @IsBoolean()
  @IsOptional()
  pathStyle: boolean;

  @IsString()
  @IsOptional()
  region: string;

  @IsString()
  @IsOptional()
  sessionToken: string;

  @IsInt()
  @IsOptional()
  partSize: number;

  @IsOptional()
  transport: object;

  constructor(props: MinioConfig) {
    super(props);
    mergeDeep(this, {
      ...props,
      useSSL: toBool(props.useSSL, true),
      pathStyle: toBool(props.pathStyle, true),
      region: props.region || 'ap-southeast-1',
    });
  }

  public get options(): ClientOptions {
    return {
      endPoint: this.endPoint,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
      useSSL: this.useSSL,
      port: this.port,
      region: this.region,
      sessionToken: this.sessionToken,
      partSize: this.partSize,
      pathStyle: this.pathStyle,
      transport: this.transport,
    };
  }
}
