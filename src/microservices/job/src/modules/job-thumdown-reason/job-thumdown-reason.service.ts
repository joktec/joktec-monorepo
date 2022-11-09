import {
  JobThumdownReason,
  JobThumdownReasonDocument,
} from './schemas/job-thumdown-reason.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobThumdownReasonService extends BaseService<JobThumdownReasonDocument> {
  constructor(
    @InjectModel(JobThumdownReason.name)
    private readonly mainModel: Model<JobThumdownReasonDocument>,
  ) {
    super(mainModel);
  }
}
