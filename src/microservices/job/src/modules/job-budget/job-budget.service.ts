import { JobBudget, JobBudgetDocument } from './schemas/job-budget.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobBudgetService extends BaseService<JobBudgetDocument> {
  constructor(
    @InjectModel(JobBudget.name)
    private readonly mainModel: Model<JobBudgetDocument>,
  ) {
    super(mainModel);
  }
}
