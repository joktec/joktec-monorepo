import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  JobBudgetHistory,
  JobBudgetHistoryDocument,
} from './schemas/job-budget-history.schema';

@Injectable()
export class JobBudgetHistoryService extends BaseService<JobBudgetHistoryDocument> {
  constructor(
    @InjectModel(JobBudgetHistory.name)
    private readonly mainModel: Model<JobBudgetHistoryDocument>,
  ) {
    super(mainModel);
  }
}
