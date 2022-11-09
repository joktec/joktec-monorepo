import {
  JobTitleSalaryRange,
  JobTitleSalaryRangeDocument,
} from './schemas/job-title-salary-range.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobTitleSalaryRangeService extends BaseService<JobTitleSalaryRangeDocument> {
  constructor(
    @InjectModel(JobTitleSalaryRange.name)
    private readonly mainModel: Model<JobTitleSalaryRangeDocument>,
  ) {
    super(mainModel);
  }
}
