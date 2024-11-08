import { IBaseRepository } from '@joktec/core';
import { IJobModel } from './job.model';

export interface IJobRepo<T extends IJobModel, ID> extends IBaseRepository<T, ID> {}
