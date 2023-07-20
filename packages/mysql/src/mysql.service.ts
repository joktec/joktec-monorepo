import { AbstractClientService, Injectable, Retry, DEFAULT_CON_ID } from '@joktec/core';
import { pick } from 'lodash';
import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options';
import { MysqlClient } from './mysql.client';
import { MysqlConfig } from './mysql.config';

const RETRY_OPTS = 'mysql.retry';

@Injectable()
export class MysqlService extends AbstractClientService<MysqlConfig, Sequelize> implements MysqlClient {
  constructor() {
    super('mysql', MysqlConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MysqlConfig): Promise<Sequelize> {
    this.logService.info('MysqlConfig: %j', config);
    const connection = pick(config, ['host', 'port', 'username', 'password', 'database']);
    const options: SequelizeOptions = {
      ...connection,
      dialect: config.dialect,
      dialectOptions: { charset: config.charset, connectTimeout: config.connectTimeout },
      logging: (sql: string, timing?: number) => {
        this.logService.debug('SQL statement: %s', sql);
        this.logService.trace('SQL execute in %j', timing);
      },
    };
    if (config.slaves?.length) {
      options.replication = { write: { ...connection }, read: config.slaves };
    }
    const sequelize = new Sequelize(options);
    this.logService.info('MySQL Service is configured in `%s` connection', config.conId);
    return sequelize;
  }

  async start(client: Sequelize, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);
    try {
      await client.authenticate();
      this.logService.info('MySQL Service have been start on host %s', config.host);
    } catch (err) {
      this.logService.error(err, 'MySQL Service failed to start on host %s', config.host);
    }
  }

  async stop(client: Sequelize, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);
    try {
      await client.close();
      this.logService.warn('MySQL Service have been stop on host %s', config.host);
    } catch (err) {
      this.logService.error(err, 'MySQL Service failed to stop on host %s', config.host);
    }
  }

  public getModel<T extends Model<T>>(model: ModelCtor<T>, conId: string = DEFAULT_CON_ID): ModelCtor<T> {
    if (!this.getClient(conId).isDefined(model.name)) {
      this.getClient(conId).addModels([model]);
    }
    return model;
  }

  public async getModelSync<T extends Model<T>>(
    model: ModelCtor<T>,
    conId: string = DEFAULT_CON_ID,
  ): Promise<ModelCtor<T>> {
    if (!this.getClient(conId).isDefined(model.name)) {
      this.getClient(conId).addModels([model]);
      await model.sync({ alter: { drop: false } });
    }
    return model;
  }
}
