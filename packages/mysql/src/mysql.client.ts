import { BaseRepository, Client, ICondition } from '@joktec/core';
import { MysqlConfig } from './mysql.config';
import { Sequelize } from 'sequelize-typescript';

export interface MysqlClient extends Client<MysqlConfig, Sequelize> {}

export interface IMysqlRepository<T, ID> extends BaseRepository<T, ID> {
  upsert(condition: ICondition, body: Partial<T>): Promise<T>;
}
