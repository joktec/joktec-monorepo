import {
  JobStatsDetail,
  JobStatsDetailDocument,
} from './schemas/job-stats-detail.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobStatsDetailService extends BaseService<JobStatsDetailDocument> {
  constructor(
    @InjectModel(JobStatsDetail.name)
    private readonly mainModel: Model<JobStatsDetailDocument>,
  ) {
    super(mainModel);
  }
}
