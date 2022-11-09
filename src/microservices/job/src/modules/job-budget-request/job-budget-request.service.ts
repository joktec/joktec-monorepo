import {
  JobBudgetRequest,
  JobBudgetRequestDocument,
} from './schemas/job-budget-request.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobBudgetRequestService extends BaseService<JobBudgetRequestDocument> {
  constructor(
    @InjectModel(JobBudgetRequest.name)
    private readonly mainModel: Model<JobBudgetRequestDocument>,
  ) {
    super(mainModel);
  }
}
