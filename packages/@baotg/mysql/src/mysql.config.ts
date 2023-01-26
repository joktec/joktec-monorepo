import { Knex } from 'knex';
import { ClientConfig, toBool, toInt } from '@baotg/core';
import { omit } from 'lodash';

export const DEFAULT_SLAVE_NODE = 'default';

export class MySqlSlaveConfig implements Knex.MySqlConnectionConfig {
  node?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  charset?: string;
  timezone?: string;
  connectTimeout?: number;
  debug?: boolean;
  trace?: boolean;

  constructor(props: MySqlSlaveConfig) {
    Object.assign(this, {
      ...props,
      node: props.node || DEFAULT_SLAVE_NODE,
    });
  }
}

export class MysqlConfig extends ClientConfig implements Knex.MySqlConnectionConfig {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  charset?: string;
  timezone?: string;
  connectTimeout?: number;
  debug?: boolean;
  trace?: boolean;
  slaves?: MySqlSlaveConfig[];

  constructor(props: MysqlConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      host: props?.host || 'localhost',
      port: toInt(props?.port, 3306),
      connectTimeout: toInt(props?.connectTimeout, 20000),
      debug: toBool(props?.debug, false),
      trace: toBool(props?.trace, false),
      slaves: [],
    });

    if (props?.slaves?.length) {
      const masterConfig = omit(props, ['slaves']);
      this.slaves = props.slaves.map(slave => new MySqlSlaveConfig({ ...slave, ...masterConfig }));
    }
  }
}
