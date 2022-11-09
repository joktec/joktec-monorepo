import {
  JobGroupJobs,
  JobGroupJobsDocument,
} from './schemas/jobgroup-jobs.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobGroupJobsService extends BaseService<JobGroupJobsDocument> {
  constructor(
    @InjectModel(JobGroupJobs.name)
    private readonly mainModel: Model<JobGroupJobsDocument>,
  ) {
    super(mainModel);
  }
}
