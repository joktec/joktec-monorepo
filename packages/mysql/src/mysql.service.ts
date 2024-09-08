import { AbstractClientService, DEFAULT_CON_ID, getTimeString, Inject, Injectable, Retry } from '@joktec/core';
import { pick } from 'lodash';
import { Model, ModelCtor, Repository, Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { MysqlClient } from './mysql.client';
import { MysqlConfig } from './mysql.config';

const RETRY_OPTS = 'mysql.retry';

@Injectable()
export class MysqlService extends AbstractClientService<MysqlConfig, Sequelize> implements MysqlClient {
  constructor(@Inject('MODELS') private models: ModelCtor<any>[]) {
    super('mysql', MysqlConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MysqlConfig): Promise<Sequelize> {
    const connection = pick(config, ['host', 'port', 'username', 'password', 'database']);
    const options: SequelizeOptions = {
      ...connection,
      dialect: config.dialect,
      dialectOptions: { charset: config.charset, connectTimeout: config.connectTimeout },
      repositoryMode: true,
      benchmark: config.debug,
      logging: (sql: string, timing?: number) => {
        if (config.debug) {
          this.logService.info('SQL statement (%s): %s', getTimeString(timing), sql);
        }
      },
    };
    if (config.slaves?.length) {
      options.replication = { write: { ...connection }, read: config.slaves };
    }
    const sequelize = new Sequelize(options);
    this.logService.info('`%s` Connection to MySQL established on host %s', config.conId, config.host);
    return sequelize;
  }

  async start(client: Sequelize, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);

    try {
      await client.authenticate();
      this.logService.info('`%s` Connected to MySQL successfully', conId);

      if (this.models?.length) {
        client.addModels(this.models);
        if (config.sync) {
          await client.sync({ alter: { drop: false } });
          this.logService.info('`%s` Sync MySQL schema successfully', conId);
        }
      }
    } catch (err) {
      this.logService.error(err, '`%s` Error when connecting to MySQL', conId);
    }
  }

  async stop(client: Sequelize, conId: string = DEFAULT_CON_ID): Promise<void> {
    try {
      await client.close();
      this.logService.warn('`%s` Close connection to MySQL successfully', conId);
    } catch (err) {
      this.logService.error(err, '`%s` Error when close connection to MySQL', conId);
    }
  }

  public getModel<T extends Model<T>>(model: string | ModelCtor<T>, conId: string = DEFAULT_CON_ID): ModelCtor<T> {
    return this.getClient(conId).model(model) as ModelCtor<T>;
  }

  public getRepository<T extends Model<T>>(model: ModelCtor<T>, conId: string = DEFAULT_CON_ID): Repository<T> {
    return this.getClient(conId).getRepository(model);
  }
}
