import {
  JobSubscriptionHistory,
  JobSubscriptionHistoryDocument,
} from './schemas/job-subscription-history.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobSubscriptionHistoryService extends BaseService<JobSubscriptionHistoryDocument> {
  constructor(
    @InjectModel(JobSubscriptionHistory.name)
    private readonly mainModel: Model<JobSubscriptionHistoryDocument>,
  ) {
    super(mainModel);
  }
}
