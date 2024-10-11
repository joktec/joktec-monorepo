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

export class MysqlSlaveConfig {
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
  COCKROACHDB = 'cockroachdb',
  SAP = 'sap',
  MARIADB = 'mariadb',
  SQLITE = 'sqlite',
  CORDOVA = 'cordova',
  REACT_NATIVE = 'react-native',
  NATIVESCRIPT = 'nativescript',
  SQLJS = 'sqljs',
  ORACLE = 'oracle',
  MSSQL = 'mssql',
  MONGODB = 'mongodb',
  AURORA_MYSQL = 'aurora-mysql',
  AURORA_POSTGRES = 'aurora-postgres',
  EXPO = 'expo',
  BETTER_SQLITE3 = 'better-sqlite3',
  CAPACITOR = 'capacitor',
  SPANNER = 'spanner',
}

export enum MysqlLogLevel {
  query = 'query',
  schema = 'schema',
  error = 'error',
  warn = 'warn',
  info = 'info',
  log = 'log',
  migration = 'migration',
}

export class MysqlBenchmarkConfig {
  @IsOptional()
  @IsBoolean()
  enable?: boolean = false;

  @IsOptional()
  @IsBoolean()
  all?: boolean = false;

  @IsOptional()
  @IsArray()
  @IsEnum(MysqlLogLevel, { each: true })
  level?: MysqlLogLevel[] = [];

  constructor(props?: Partial<MysqlBenchmarkConfig>) {
    Object.assign(this, props);
  }
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
  sync?: boolean = true;

  @IsOptional()
  @IsTypes(MysqlBenchmarkConfig)
  benchmark?: MysqlBenchmarkConfig;

  constructor(props: MysqlConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      benchmark: new MysqlBenchmarkConfig(props?.benchmark),
    });
    if (props?.slaves?.length) {
      const masterConfig = pick(props, ['host', 'port', 'username', 'password', 'database']);
      this.slaves = props.slaves.map(slave => new MysqlSlaveConfig({ ...masterConfig, ...slave }));
    }
  }
}
