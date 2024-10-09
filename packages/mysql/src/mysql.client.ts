import { Client, Constructor, DeepPartial, IBaseRepository, KeyOf } from '@joktec/core';
import { DataSource, Repository } from 'typeorm';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';
import { IMysqlOption, MysqlId, MysqlModel } from './models';
import { MysqlConfig } from './mysql.config';

export const MODEL_REGISTRY_KEY = 'MODEL_REGISTRY_KEY';

export interface MysqlModuleOptions {
  models?: Constructor<MysqlModel>[];
  conId?: string;
}

export interface MysqlModelRegistry {
  [conId: string]: Constructor<MysqlModel>[];
}

export interface MysqlClient extends Client<MysqlConfig, DataSource> {
  getRepository<T extends MysqlModel>(entityClass: Constructor<T>, conId?: string): Repository<T>;
}

export interface IMysqlRepository<T extends MysqlModel, ID extends MysqlId> extends IBaseRepository<T, ID> {
  upsert(
    body: DeepPartial<T>,
    onConflicts: KeyOf<T>[],
    opts?: IMysqlOption<T> & Omit<UpsertOptions<T>, 'conflictPaths'>,
  ): Promise<T>;

  bulkUpsert(
    body: DeepPartial<T>[],
    onConflicts: KeyOf<T>[],
    opts?: IMysqlOption<T> & Omit<UpsertOptions<T>, 'conflictPaths'>,
  ): Promise<T[]>;
}
