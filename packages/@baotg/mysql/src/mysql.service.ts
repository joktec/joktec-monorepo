import { AbstractClientService, Injectable, Retry, DEFAULT_CON_ID } from '@baotg/core';
import { MysqlConfig } from './mysql.config';
import { MysqlClient } from './mysql.client';
import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';

const RETRY_OPTS = 'mysql.retry';

@Injectable()
export class MysqlService extends AbstractClientService<MysqlConfig, Sequelize> implements MysqlClient {
  constructor() {
    super('mysql', MysqlConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MysqlConfig): Promise<Sequelize> {
    const sequelize = new Sequelize({
      ...config,
      dialectOptions: { charset: config.charset, timeout: config.timeout },
      dialect: 'mysql',
      // models: [__dirname + '/**/*.entity.ts'],
      // modelMatch: (filename, member) => {
      //   return filename.substring(0, filename.indexOf('.entity.ts')) === member.toLowerCase();
      // },
      logging: (sql: string, timing?: number) => {
        this.logService.debug('SQL statement: %s', sql);
        this.logService.debug('SQL execute in %s', timing);
      },
      replication: { write: { ...config }, read: config.slaves },
    });
    this.logService.info('MySQL Service is configured in `%s` connection', config.conId);
    return sequelize;
  }

  async start(client: Sequelize, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);
    try {
      await client.authenticate();
      this.logService.info('MySQL Service have been start on host %s', config.host);
    } catch (err) {
      console.error('Unable to connect to the database:', err);
      this.logService.error('MySQL Service failed to start on host %s', config.host);
    }
  }

  async stop(client: Sequelize, conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);
    try {
      await client.close();
      this.logService.warn('MySQL Service have been stop on host %s', config.host);
    } catch (err) {
      console.error('Unable to connect to the database:', err);
      this.logService.error('MySQL Service failed to stop on host %s', config.host);
    }
  }

  public getModel<T extends Model<T>>(model: ModelCtor<T>, conId: string = DEFAULT_CON_ID): ModelCtor<T> {
    if (!this.getClient(conId).isDefined(model.name)) {
      this.getClient(conId).addModels([model]);
    }
    return model;
  }
}
