import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, toBool, toInt } from '@joktec/core';

export class MongoConfig extends ClientConfig {
  @IsString()
  @IsOptional()
  uri?: string;

  @IsString()
  @IsNotEmpty()
  host?: string = 'localhost';

  @IsInt()
  @IsNotEmpty()
  port?: number;

  @IsString()
  @IsNotEmpty()
  username!: string;

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
  retryTimeout?: number;

  @IsBoolean()
  @IsOptional()
  debug?: boolean;

  @IsString()
  @IsOptional()
  params?: string;

  @IsBoolean()
  @IsOptional()
  strictQuery?: boolean;

  @IsBoolean()
  @IsOptional()
  autoIndex?: boolean;

  constructor(props: MongoConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      port: toInt(props.port, 27017),
      replica: toBool(props.replica, false),
      retryTimeout: toInt(props.retryTimeout, 20000),
      strictQuery: toBool(props.strictQuery, true),
      autoIndex: toBool(props.autoIndex, true),
      debug: toBool(props.debug, false),
    });
  }
}
