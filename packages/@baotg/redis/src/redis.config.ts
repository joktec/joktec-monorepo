import { ClientConfig, IsNotEmpty, IsOptional, IsString, IsInt, IsBoolean, IsTypes, toBool, toInt } from '@baotg/core';

export type CacheKey = `#${string}` | `#${string}.${string}`;

export interface CacheableOption {
  key?: 'params' | CacheKey;
  expiry?: number;
  conId?: string;
}

export interface CacheEvictOption {
  key?: 'params' | CacheKey;
  allEntries?: boolean;
  conId?: string;
}

export class RedisConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  host!: string;

  @IsInt()
  @IsNotEmpty()
  port!: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsTypes(['string', 'int'])
  password?: string;

  @IsOptional()
  @IsInt()
  database?: number;

  @IsOptional()
  @IsBoolean()
  readonly?: boolean;

  @IsOptional()
  @IsInt()
  retryTimeout?: number;

  constructor(props: RedisConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      host: props.host || 'localhost',
      port: toInt(props.port, 6379),
      readOnly: toBool(props.readonly, false),
      retryTimeout: toInt(props?.retryTimeout, 20000),
    });
  }
}
