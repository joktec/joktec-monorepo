import {
  ClientConfig,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTypes,
} from '@joktec/core';
import { pick } from 'lodash';
import { ConnectionOptions } from 'sequelize/types/sequelize';

export class MysqlSlaveConfig implements ConnectionOptions {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsInt()
  @IsNotEmpty()
  port: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  database: string;

  constructor(props: MysqlSlaveConfig) {
    Object.assign(this, { ...props });
  }
}

export enum Dialect {
  MYSQL = 'mysql',
  POSTGRES = 'postgres',
  SQLITE = 'sqlite',
  MARIADB = 'mariadb',
  MSSQL = 'mssql',
  DB2 = 'db2',
  SNOWFLAKE = 'snowflake',
  ORACLE = 'oracle',
}

export class MysqlConfig extends ClientConfig {
  @IsEnum(Dialect)
  @IsNotEmpty()
  dialect?: Dialect = Dialect.MYSQL;

  @IsString()
  @IsNotEmpty()
  host?: string = 'localhost';

  @IsInt()
  @IsNotEmpty()
  port?: number = 3306;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  database!: string;

  @IsString()
  @IsOptional()
  charset?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsInt()
  @IsOptional()
  connectTimeout?: number = 20000;

  @IsArray()
  @IsTypes(MysqlSlaveConfig, { each: true })
  @IsOptional()
  slaves?: MysqlSlaveConfig[] = [];

  @IsOptional()
  @IsBoolean()
  debug?: boolean = false;

  @IsOptional()
  @IsBoolean()
  benchmark?: boolean = false;

  @IsOptional()
  @IsBoolean()
  sync?: boolean = true;

  constructor(props: MysqlConfig) {
    super(props);
    Object.assign(this, props);
    if (props?.slaves?.length) {
      const masterConfig = pick(props, ['host', 'port', 'username', 'password', 'database']);
      this.slaves = props.slaves.map(slave => new MysqlSlaveConfig({ ...masterConfig, ...slave }));
    }
  }
}
