import { Client, Constructor, IBaseRepository } from '@joktec/core';
import { DataSource, EntityManager, EntitySubscriberInterface, Repository } from 'typeorm';
import { MysqlId, MysqlModel } from './models';
import { MysqlConfig } from './mysql.config';

export const MODEL_REGISTRY_KEY = 'MODEL_REGISTRY_KEY';
export const SUBSCRIBER_REGISTRY_KEY = 'SUBSCRIBER_REGISTRY_KEY';

export interface MysqlModuleOptions {
  models?: Constructor<MysqlModel>[];
  subscribers?: Constructor<EntitySubscriberInterface>[];
  conId?: string;
}

export interface MysqlModelRegistry {
  [conId: string]: Constructor<MysqlModel>[];
}

export interface MysqlSubscriberRegistry {
  [conId: string]: Constructor<EntitySubscriberInterface>[];
}

export interface MysqlClient extends Client<MysqlConfig, DataSource> {
  getEntityManager(conId?: string): EntityManager;

  getRepository<T extends MysqlModel>(entityClass: Constructor<T>, conId?: string): Repository<T>;
}

export interface IMysqlRepository<T extends MysqlModel, ID extends MysqlId> extends IBaseRepository<T, ID> {}
