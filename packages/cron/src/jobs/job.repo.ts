import { DeepPartial, IBaseRepository, KeyOf } from '@joktec/core';
import { IJobModel } from './job.model';

export interface IJobRepo<T extends IJobModel, ID> extends IBaseRepository<T, ID> {
  upsert(body: DeepPartial<T>, onConflicts: KeyOf<T>[], opts?: any): Promise<T[]>;

  bulkUpsert(docs: Array<DeepPartial<T>>, onConflicts?: KeyOf<T>[], opts?: any): Promise<any>;
}
