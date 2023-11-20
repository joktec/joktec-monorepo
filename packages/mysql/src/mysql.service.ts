import { writeFileSync } from 'fs';
import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { pick } from 'lodash';
import sequelizeErd from 'sequelize-erd';
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
    this.logService.info('`%s` Connection to MySQL established on host %s', config.conId, config.host);
    return sequelize;
  }

  async start(client: Sequelize, conId: string = DEFAULT_CON_ID): Promise<void> {
    try {
      await client.authenticate();
      this.logService.info('`%s` Connected to MySQL successfully', conId);
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

  /**
   * See more: https://www.npmjs.com/package/sequelize-erd
   * @param conId
   */
  public async exportDiagram(conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);
    const svg = await sequelizeErd({
      source: this.getClient(conId),
      format: 'json', // See available options below
      engine: 'circo', // See available options below
      arrowShapes: {
        // Any of the below 4 options formatted ['startShape', 'endShape']. If excluded, the default is used.
        BelongsToMany: ['crow', 'crow'], // Default: ['none', 'crow']
        BelongsTo: ['inv', 'crow'], // Default: ['crow', 'none']
        HasMany: ['crow', 'inv'], // Default: ['none', 'crow']
        HasOne: ['dot', 'dot'], // Default: ['none', 'none']
      },
      arrowSize: 1.2, // Default: 0.6
      lineWidth: 1, // Default: 0.75
      color: 'green3', // Default: 'black'
    });

    const filename = `${config.database}_erd.svg`;
    writeFileSync(filename, svg);
  }
}
