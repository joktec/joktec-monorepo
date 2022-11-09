import { JobStats, JobStatsDocument } from './schemas/job-stats.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobStatsService extends BaseService<JobStatsDocument> {
  constructor(
    @InjectModel(JobStats.name)
    private readonly mainModel: Model<JobStatsDocument>,
  ) {
    super(mainModel);
  }
}
