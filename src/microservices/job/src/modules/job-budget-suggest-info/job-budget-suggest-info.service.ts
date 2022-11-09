import {
  JobBudgetSuggestInfo,
  JobBudgetSuggestInfoDocument,
} from './schemas/job-budget-suggest-info.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobBudgetSuggestInfoService extends BaseService<JobBudgetSuggestInfoDocument> {
  constructor(
    @InjectModel(JobBudgetSuggestInfo.name)
    private readonly mainModel: Model<JobBudgetSuggestInfoDocument>,
  ) {
    super(mainModel);
  }
}
