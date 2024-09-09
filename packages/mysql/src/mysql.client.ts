import { Client, DeepPartial, IBaseRepository } from '@joktec/core';
import { Model, ModelCtor, Repository, Sequelize } from 'sequelize-typescript';
import { MysqlConfig } from './mysql.config';

export const MODEL_REGISTRY_KEY = 'MODEL_REGISTRY_KEY';

export interface MysqlModuleOptions {
  models?: ModelCtor[];
  conId?: string;
}

export interface MysqlModelRegistry {
  [conId: string]: ModelCtor[];
}

export interface MysqlClient extends Client<MysqlConfig, Sequelize> {
  getModel<T extends Model<T>>(model: ModelCtor<T>, conId?: string): ModelCtor<T>;

  getRepository<T extends Model<T>>(model: ModelCtor<T>, conId?: string): Repository<T>;
}

export interface IMysqlRepository<T extends Model<T>, ID> extends IBaseRepository<T, ID> {
  upsert(body: DeepPartial<T>, onConflicts: (keyof T)[]): Promise<T>;
}
