import { ClientConfig, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsTypes, toInt } from '@joktec/core';
import { pick } from 'lodash';
import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options';
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

export class MysqlConfig extends ClientConfig implements SequelizeOptions {
  @IsString()
  @IsNotEmpty()
  dialect: Dialect;

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

  @IsString()
  @IsOptional()
  charset?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsInt()
  @IsOptional()
  connectTimeout?: number;

  @IsArray()
  @IsTypes([MysqlSlaveConfig], { each: true })
  @IsOptional()
  slaves?: MysqlSlaveConfig[];

  constructor(props: MysqlConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      dialect: props?.dialect || Dialect.MYSQL,
      host: props?.host || 'localhost',
      port: toInt(props?.port, 3306),
      connectTimeout: toInt(props?.connectTimeout, 20000),
      slaves: [],
    });

    if (props?.slaves?.length) {
      const masterConfig = pick(props, ['host', 'port', 'username', 'password', 'database']);
      this.slaves = props.slaves.map(slave => new MysqlSlaveConfig({ ...masterConfig, ...slave }));
    }
  }
}
