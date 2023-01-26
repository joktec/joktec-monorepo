import { AbstractClientService, Injectable, Retry, DEFAULT_CON_ID } from '@baotg/core';
import { Knex, knex } from 'knex';
import schemaInspector from 'knex-schema-inspector';
import { DEFAULT_SLAVE_NODE, MysqlConfig, MySqlSlaveConfig } from './mysql.config';
import { MysqlClient } from './mysql.client';
import { SchemaInspector } from 'knex-schema-inspector/lib/types/schema-inspector';
import { has, omit } from 'lodash';
import { RawBinding } from './models';

const RETRY_OPTS = 'mysql.retry';

@Injectable()
export class MysqlService extends AbstractClientService<MysqlConfig, Knex> implements MysqlClient {
  private slaves: { [node: string]: Knex } = {};
  private inspector: { [conId: string]: SchemaInspector } = {};

  constructor() {
    super('mysql', MysqlConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MysqlConfig): Promise<Knex> {
    const connectionConfig = omit(config, ['username', 'slave']);
    const knexInstance = knex({
      connection: { user: config.username, ...connectionConfig },
      client: 'mysql',
      debug: config.debug,
      log: this.knexLogger,
    });
    this.inspector[config.conId] = schemaInspector(knexInstance);
    this.logService.info('MySQL Service is configured in `%s` connection', config.conId);
    await Promise.all(config.slaves.map(slave => this.initSlave(slave, config.conId)));
    return knexInstance;
  }

  @Retry(RETRY_OPTS)
  private async initSlave(config: MySqlSlaveConfig, conId: string = DEFAULT_CON_ID) {
    const connectionConfig = omit(config, ['username']);
    const nodeConId = `${conId}_${config.node}`;
    this.slaves[nodeConId] = knex({
      connection: { user: config.username, ...connectionConfig },
      client: 'mysql',
      debug: config.debug,
      log: this.knexLogger,
    });
    this.logService.info('MySQL Slave is configured in `%s` connection, node `%s`', conId, config.node);
  }

  private get knexLogger(): Knex.Logger {
    return {
      warn: this.logService.warn.bind(this.logService),
      error: this.logService.error.bind(this.logService),
      deprecate: this.logService.info.bind(this.logService),
      debug: this.logService.debug.bind(this.logService),
    };
  }

  async start(client: Knex, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);
    this.logService.info('MySQL Service have been start on host %s', config.host);
  }

  async stop(client: Knex, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);

    for (const key of Object.keys(this.slaves)) {
      await this.slaves[key].destroy();
    }

    await client.destroy(() => {
      this.logService.warn('MySQL Service have been stop on host %s', config.host);
    });
  }

  public getInspector(conId: string = DEFAULT_CON_ID): SchemaInspector {
    return this.inspector[conId];
  }

  public getKnex(conId: string = DEFAULT_CON_ID): Knex {
    return this.getClient(conId);
  }

  public getSlaveKnex(node: string = DEFAULT_SLAVE_NODE, conId: string = DEFAULT_CON_ID): Knex {
    const nodeConId = `${conId}_${node}`;
    return has(this.slaves, nodeConId) ? this.slaves[nodeConId] : this.getKnex(conId);
  }

  /**
   * @deprecated Remove in near future, use MysqlRepo or MysqlReadRepo instead.
   */
  public qb(table: string, conId: string = DEFAULT_CON_ID): Knex.QueryBuilder {
    return this.getKnex(conId).queryBuilder().table(table);
  }

  public async exec<T extends {} = any>(qb: Knex.QueryBuilder): Promise<T | T[]> {
    this.logService.debug('MySQL debug: %s', qb.toQuery());
    return qb;
  }

  public async execRaw<T extends {} = any>(
    sql: string,
    bindings: RawBinding,
    conId: string = DEFAULT_CON_ID,
  ): Promise<T[]> {
    const qb = this.getKnex(conId).raw(sql, bindings);
    this.logService.debug('MySQL debug: %s', qb.toQuery());
    const res: any[][] = await qb;
    return res.length ? res[0] : [];
  }
}
