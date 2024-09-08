import { Client, DeepPartial, IBaseRepository } from '@joktec/core';
import { Model, ModelCtor, Repository, Sequelize } from 'sequelize-typescript';
import { MysqlConfig } from './mysql.config';

export interface MysqlClient extends Client<MysqlConfig, Sequelize> {
  getModel<T extends Model<T>>(model: ModelCtor<T>, conId?: string): ModelCtor<T>;

  getRepository<T extends Model<T>>(model: ModelCtor<T>, conId?: string): Repository<T>;
}

export interface IMysqlRepository<T extends Model<T>, ID> extends IBaseRepository<T, ID> {
  upsert(body: DeepPartial<T>, onConflicts: (keyof T)[]): Promise<T>;
}
