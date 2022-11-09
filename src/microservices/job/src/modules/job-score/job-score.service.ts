import { JobScore, JobScoreDocument } from './schemas/job-score.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobScoreService extends BaseService<JobScoreDocument> {
  constructor(
    @InjectModel(JobScore.name)
    private readonly mainModel: Model<JobScoreDocument>,
  ) {
    super(mainModel);
  }
}
