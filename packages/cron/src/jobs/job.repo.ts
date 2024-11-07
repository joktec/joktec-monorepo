import { DeepPartial, IBaseRepository, KeyOf } from '@joktec/core';
import { JobModel } from './job.model';

export interface IJobRepo<T extends JobModel, ID> extends IBaseRepository<T, ID> {
  upsert(body: DeepPartial<T>, onConflicts: KeyOf<T>[], opts?: any): Promise<T[]>;

  bulkUpsert(docs: Array<DeepPartial<T>>, onConflicts?: KeyOf<T>[], opts?: any): Promise<any>;
}
