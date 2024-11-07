import { DeepPartial, IBaseRepository, ICondition, KeyOf } from '@joktec/core';
import { ICrontabHistoryModel, ICrontabModel } from './crontab.model';

export interface ICrontabRepo<T extends ICrontabModel, ID> extends IBaseRepository<T, ID> {
  bulkUpsert(docs: Array<DeepPartial<T>>, onConflicts?: KeyOf<T>[], opts?: any): Promise<any>;

  deleteMany(cond: ICondition<T>, opts?: any): Promise<T[]>;
}

export interface ICrontabHistoryRepo<T extends ICrontabHistoryModel, ID> extends IBaseRepository<T, ID> {
  deleteMany(cond: ICondition<T>, opts?: any): Promise<T[]>;
}
