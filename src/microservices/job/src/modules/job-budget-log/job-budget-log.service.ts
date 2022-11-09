import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  JobBudgetLog,
  JobBudgetLogDocument,
} from './schemas/job-budget-log.schema';

@Injectable()
export class JobBudgetLogService extends BaseService<JobBudgetLogDocument> {
  constructor(
    @InjectModel(JobBudgetLog.name)
    private readonly mainModel: Model<JobBudgetLogDocument>,
  ) {
    super(mainModel);
  }
}
