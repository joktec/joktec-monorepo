import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, toBool, toInt } from '@joktec/core';

export class MongoConfig extends ClientConfig {
  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsNotEmpty()
  host?: string;

  @IsInt()
  @IsNotEmpty()
  port?: string;

  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  database?: string;

  @IsOptional()
  @IsBoolean()
  replica?: boolean;

  @IsInt()
  @IsOptional()
  retryTimeout: number;

  @IsInt()
  @IsOptional()
  connectTimeout: number;

  @IsBoolean()
  @IsOptional()
  strictQuery?: boolean;

  @IsInt()
  @IsOptional()
  maxTimeMS?: number;

  @IsBoolean()
  @IsOptional()
  directConnection?: boolean;

  @IsBoolean()
  @IsOptional()
  autoCreate?: boolean;

  constructor(props: MongoConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      database: props?.database || 'admin',
      host: props?.host || 'localhost',
      port: toInt(props?.port, 27017),
      retryTimeout: toInt(props?.retryTimeout, 20000),
      connectTimeout: toInt(props?.connectTimeout, 10000),
      maxTimeMS: toInt(props?.maxTimeMS, 10000),
      strictQuery: toBool(props?.strictQuery, true),
      directConnection: toBool(props?.directConnection, false),
      replica: toBool(props?.replica, false),
      autoCreate: toBool(props?.autoCreate, true),
    });
  }
}
