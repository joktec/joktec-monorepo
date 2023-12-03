import { Client, DeepPartial, IBaseRepository, ICondition } from '@joktec/core';
import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { MysqlConfig } from './mysql.config';

export interface MysqlClient extends Client<MysqlConfig, Sequelize> {
  getModel<T extends Model<T>>(model: ModelCtor<T>, conId?: string): ModelCtor<T>;

  exportDiagram(conId?: string): Promise<void>;
}

export interface IMysqlRepository<T extends Model<T>, ID> extends IBaseRepository<T, ID> {
  upsert(condition: ICondition, body: DeepPartial<T>): Promise<T>;
}
