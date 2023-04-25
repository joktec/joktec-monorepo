import { BaseRepository, Client, ICondition } from '@joktec/core';
import { MysqlConfig } from './mysql.config';
import { Model, Sequelize } from 'sequelize-typescript';

export interface MysqlClient extends Client<MysqlConfig, Sequelize> {}

export interface IMysqlRepository<T extends Model<T>, ID> extends BaseRepository<T, ID> {
  upsert(condition: ICondition, body: Partial<T>): Promise<T>;
}
