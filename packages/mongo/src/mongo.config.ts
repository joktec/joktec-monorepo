import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from '@joktec/core';

export class MongoConfig extends ClientConfig {
  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsNotEmpty()
  host?: string = 'localhost';

  @IsInt()
  @IsNotEmpty()
  port?: number = 27017;

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
  replica?: boolean = false;

  @IsInt()
  @IsOptional()
  retryTimeout: number = 20000;

  @IsInt()
  @IsOptional()
  connectTimeout: number = 10000;

  @IsBoolean()
  @IsOptional()
  strictQuery?: boolean = true;

  @IsBoolean()
  @IsOptional()
  directConnection?: boolean = false;

  @IsBoolean()
  @IsOptional()
  autoCreate?: boolean = true;

  constructor(props: MongoConfig) {
    super(props);
    Object.assign(this, props);
  }
}
