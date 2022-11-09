import { Knex } from 'knex';
import { ClientConfig, toBool, toInt } from '@jobhopin/core';

export class MysqlConfig extends ClientConfig implements Knex.MySqlConnectionConfig {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  charset?: string;
  timezone?: string;
  connectTimeout?: number;
  debug?: boolean;
  trace?: boolean;

  constructor(props: MysqlConfig) {
    super(props);
    Object.assign(this, {
      host: props?.host || 'localhost',
      port: toInt(props?.port, 3306),
      connectTimeout: toInt(props?.connectTimeout, 20000),
      debug: toBool(props?.debug, false),
      trace: toBool(props?.trace, false),
      ...props,
    });
  }
}
