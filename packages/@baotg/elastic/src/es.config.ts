import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, toBool, toInt } from '@jobhopin/core';
import { ApiKeyAuth, BasicAuth, BearerAuth } from '@elastic/transport/lib/types';

export class EsConfig extends ClientConfig {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsInt()
  maxRetries?: number;

  @IsOptional()
  @IsInt()
  requestTimeout?: number;

  @IsOptional()
  @IsInt()
  pingTimeout?: number;

  @IsOptional()
  @IsBoolean()
  sniffOnStart?: boolean;

  @IsOptional()
  @IsString()
  proxy?: string;

  auth?: BasicAuth | ApiKeyAuth | BearerAuth;

  constructor(props: EsConfig) {
    super(props);
    Object.assign(this, {
      url: props?.url,
      maxRetries: toInt(props?.maxRetries, 3),
      requestTimeout: toInt(props?.requestTimeout, 60000),
      pingTimeout: toInt(props?.pingTimeout, 60000),
      sniffOnStart: toBool(props?.sniffOnStart, false),
      proxy: props?.proxy,
      auth: props?.auth,
    });
  }
}
