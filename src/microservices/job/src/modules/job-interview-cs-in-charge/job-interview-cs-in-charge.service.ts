import {
  JobInterviewCsInCharge,
  JobInterviewCsInChargeDocument,
} from './schemas/job-interview-cs-in-charge.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobInterviewCsInChargeService extends BaseService<JobInterviewCsInChargeDocument> {
  constructor(
    @InjectModel(JobInterviewCsInCharge.name)
    private readonly mainModel: Model<JobInterviewCsInChargeDocument>,
  ) {
    super(mainModel);
  }
}
