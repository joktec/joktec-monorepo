import { JobBounty, JobBountyDocument } from './schemas/job-bounty.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobBountyService extends BaseService<JobBountyDocument> {
  constructor(
    @InjectModel(JobBounty.name)
    private readonly mainModel: Model<JobBountyDocument>,
  ) {
    super(mainModel);
  }
}
