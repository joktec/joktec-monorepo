import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerMarketValue, JobseekerMarketValueDocument } from './schemas/jobseeker_market_value.schema';

@Injectable()
export class JobseekerMarketValueService extends BaseService<JobseekerMarketValueDocument>{
  constructor(
    @InjectModel(JobseekerMarketValue.name)
    private jobseekerMarketValueModel: Model<JobseekerMarketValueDocument>,
  ) {
    super(jobseekerMarketValueModel);
  }
}
