import {
  JobGroupBurntCredits,
  JobGroupBurntCreditsDocument,
} from './schemas/jobgroup-burnt-credits.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobGroupBurntCreditsService extends BaseService<JobGroupBurntCreditsDocument> {
  constructor(
    @InjectModel(JobGroupBurntCredits.name)
    private readonly mainModel: Model<JobGroupBurntCreditsDocument>,
  ) {
    super(mainModel);
  }
}
