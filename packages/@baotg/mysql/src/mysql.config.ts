import { ClientConfig, IsInt, IsNotEmpty, IsOptional, IsString, IsTypes, toInt } from '@baotg/core';
import { omit } from 'lodash';
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

export class MysqlConfig extends ClientConfig implements SequelizeOptions {
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

  @IsString()
  @IsOptional()
  timeout?: number;

  @IsTypes([MysqlSlaveConfig])
  @IsOptional()
  slaves?: MysqlSlaveConfig[];

  constructor(props: MysqlConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      host: props?.host || 'localhost',
      port: toInt(props?.port, 3306),
      timeout: toInt(props?.timeout, 20000),
      slaves: [],
    });

    if (props?.slaves?.length) {
      const masterConfig = omit(props, ['slaves']);
      this.slaves = props.slaves.map(slave => new MysqlSlaveConfig(Object.assign({}, slave, masterConfig)));
    }
  }
}
