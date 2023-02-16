import { BaseRepository, Client, ICondition } from '@baotg/core';
import { MysqlConfig } from './mysql.config';
import { Sequelize } from 'sequelize-typescript';
import { MysqlId } from './models';

export interface MysqlClient extends Client<MysqlConfig, Sequelize> {}

export interface MysqlRepository<T, ID> extends BaseRepository<T, ID> {
  upsert(condition: ICondition, body: T): Promise<T>;
}
