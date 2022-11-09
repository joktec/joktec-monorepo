import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  JobBountyHistory,
  JobBountyHistoryDocument,
} from './schemas/job-bounty-history.schema';

@Injectable()
export class JobBountyHistoryService extends BaseService<JobBountyHistoryDocument> {
  constructor(
    @InjectModel(JobBountyHistory.name)
    private readonly mainModel: Model<JobBountyHistoryDocument>,
  ) {
    super(mainModel);
  }
}
