import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerInterest, JobseekerInterestDocument } from './schemas/jobseeker_interest.schema';

@Injectable()
export class JobseekerInterestService extends BaseService<JobseekerInterestDocument>{
  constructor(
    @InjectModel(JobseekerInterest.name)
    private jobseekerInterestModel: Model<JobseekerInterestDocument>,
  ) {
    super(jobseekerInterestModel);
  }
}
