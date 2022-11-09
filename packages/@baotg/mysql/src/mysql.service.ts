import { Injectable, Retry, AbstractClientService } from '@jobhopin/core';
import { MysqlConfig } from './mysql.config';
import { MysqlClient } from './mysql.client';
import { Knex, knex } from 'knex';

export const RETRY_OPTS = 'mysql.retry';

@Injectable()
export class MysqlService extends AbstractClientService<MysqlConfig, Knex.Client> implements MysqlClient {
  constructor() {
    super('mysql', MysqlConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MysqlConfig): Promise<Knex.Client> {
    const knexInstance = knex({
      connection: { ...config },
      client: 'mysql',
      debug: config.debug,
      log: {
        warn: this.logService.warn.bind(this.logService),
        error: this.logService.error.bind(this.logService),
        deprecate: this.logService.info.bind(this.logService),
        debug: this.logService.debug.bind(this.logService),
      },
    });
    this.logService.info('MySQL Service is configured %s', config.conId);
    return knexInstance.client;
  }

  async start(client: Knex.Client): Promise<void> {
    this.logService.info('MySQL Service have been start on host %s', (client.config.connection as any)?.host);
  }

  async stop(client: Knex.Client): Promise<void> {
    await client.destroy(() => {
      this.logService.warn('MySQL Service have been stop on host %s', (client.config.connection as any)?.host);
    });
  }

  public getKnex(conId?: string): Knex.Client {
    return this.getClient(conId);
  }

  public schema(conId?: string): Knex.SchemaBuilder {
    return this.getKnex(conId).schemaBuilder();
  }

  public qb(table: string, conId?: string): Knex.QueryBuilder {
    return this.getKnex(conId).queryBuilder().table(table);
  }

  public async exec<T extends {} = any>(qb: Knex.QueryBuilder): Promise<T | T[]> {
    this.logService.debug('MySQL debug: %s', qb.toQuery());
    return qb;
  }
}
