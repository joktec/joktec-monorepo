import { ClientConfig, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, toBool, toInt } from '@joktec/core';

export enum OrmPlatform {
  mongo = 'mongo',
  mysql = 'mysql',
  postgres = 'postgres',
  sqlite = 'sqlite',
  mariadb = 'mariadb',
}

export class OrmConfig extends ClientConfig {
  @IsEnum(OrmPlatform)
  @IsNotEmpty()
  platform!: OrmPlatform;

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

  constructor(props: OrmConfig) {
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
    });
  }
}
