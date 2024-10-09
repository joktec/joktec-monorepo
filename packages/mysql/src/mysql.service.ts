import { AbstractClientService, Constructor, DEFAULT_CON_ID, Inject, Injectable, Retry } from '@joktec/core';
import { pick } from 'lodash';
import { DatabaseType, DataSource, Repository } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MysqlModel } from './models';
import { MODEL_REGISTRY_KEY, MysqlClient, MysqlModelRegistry } from './mysql.client';
import { MysqlConfig } from './mysql.config';

const RETRY_OPTS = 'mysql.retry';

@Injectable()
export class MysqlService extends AbstractClientService<MysqlConfig, DataSource> implements MysqlClient {
  constructor(@Inject(MODEL_REGISTRY_KEY) private modelRegistry: MysqlModelRegistry) {
    super('mysql', MysqlConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MysqlConfig): Promise<DataSource> {
    const connection = pick(config, ['host', 'port', 'username', 'password', 'database']);
    const options = {
      ...config,
      type: config.dialect as DatabaseType,
      namingStrategy: new SnakeNamingStrategy(),
      entities: [...this.modelRegistry[config.conId]],
    } as DataSourceOptions;

    if (config.slaves?.length) {
      options['replication'] = { master: { ...connection }, slaves: [...config.slaves] };
    }

    const AppDataSource = new DataSource(options);
    this.logService.info('`%s` Connection to MySQL established on host %s', config.conId, config.host);
    return AppDataSource;
  }

  async start(client: DataSource, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);

    try {
      await client.initialize();
      this.logService.info('`%s` Connected to MySQL successfully', conId);

      if (this.modelRegistry[conId]) {
        // client.setOptions({ entities: [...this.modelRegistry[conId]] as any });
        if (config.sync) {
          await client.synchronize(true);
          this.logService.info('`%s` Sync MySQL schema successfully', conId);
        }
      }
    } catch (err) {
      this.logService.error(err, '`%s` Error when connecting to MySQL', conId);
    }
  }

  async stop(client: DataSource, conId: string = DEFAULT_CON_ID): Promise<void> {
    try {
      await client.destroy();
      this.logService.warn('`%s` Close connection to MySQL successfully', conId);
    } catch (err) {
      this.logService.error(err, '`%s` Error when close connection to MySQL', conId);
    }
  }

  public getRepository<T extends MysqlModel>(
    entityClass: Constructor<T>,
    conId: string = DEFAULT_CON_ID,
  ): Repository<T> {
    return this.getClient(conId).getRepository(entityClass as any);
  }
}
