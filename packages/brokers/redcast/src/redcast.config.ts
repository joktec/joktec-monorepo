import { ClientConfig } from '@joktec/core';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsTypes } from '@joktec/utils';

export class RedcastConfig extends ClientConfig {
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
  password?: string | number;

  @IsOptional()
  @IsInt()
  database?: number;

  @IsOptional()
  @IsBoolean()
  readonly?: boolean;

  @IsOptional()
  @IsInt()
  retryTimeout?: number = 20000;

  @IsOptional()
  @IsInt()
  connectTimeout?: number = 20000;

  @IsOptional()
  @IsInt()
  maxConnections?: number;

  constructor(props: RedcastConfig) {
    super(props);
    Object.assign(this, props);
  }
}
