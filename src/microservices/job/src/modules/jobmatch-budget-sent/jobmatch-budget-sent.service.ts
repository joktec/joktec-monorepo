import {
  JobMatchBudgetSent,
  JobMatchBudgetSentDocument,
} from './schemas/jobmatch-budget-sent.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobMatchBudgetSentService extends BaseService<JobMatchBudgetSentDocument> {
  constructor(
    @InjectModel(JobMatchBudgetSent.name)
    private readonly mainModel: Model<JobMatchBudgetSentDocument>,
  ) {
    super(mainModel);
  }
}
