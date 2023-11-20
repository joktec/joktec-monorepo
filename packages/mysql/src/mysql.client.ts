import { IBaseRepository, Client, DeepPartial, ICondition } from '@joktec/core';
import { Model, Sequelize } from 'sequelize-typescript';
import { MysqlConfig } from './mysql.config';

export interface MysqlClient extends Client<MysqlConfig, Sequelize> {
  exportDiagram(conId?: string): Promise<void>;
}

export interface IMysqlRepository<T extends Model<T>, ID> extends IBaseRepository<T, ID> {
  upsert(condition: ICondition, body: DeepPartial<T>): Promise<T>;
}
