import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, toBool, toInt } from '@joktec/core';

export class MongoConfig extends ClientConfig {
  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsNotEmpty()
  host?: string = 'localhost';

  @IsInt()
  @IsNotEmpty()
  port?: number;

  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  database?: string = 'admin';

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

  @IsBoolean()
  @IsOptional()
  directConnection?: boolean;

  @IsBoolean()
  @IsOptional()
  autoCreate?: boolean;

  @IsBoolean()
  @IsOptional()
  debug?: boolean;

  constructor(props: MongoConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      port: toInt(props.port, 27017),
      replica: toBool(props.replica, false),
      retryTimeout: toInt(props.retryTimeout, 20000),
      connectTimeout: toInt(props.connectTimeout, 10000),
      strictQuery: toBool(props.strictQuery, true),
      directConnection: toBool(props.directConnection, false),
      autoCreate: toBool(props.autoCreate, true),
      debug: toBool(props.debug, false),
    });
  }
}
