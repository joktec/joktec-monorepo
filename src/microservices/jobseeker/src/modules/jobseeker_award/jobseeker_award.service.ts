import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerAward, JobseekerAwardDocument } from './schemas/jobseeker_award.schema';

@Injectable()
export class JobseekerAwardService extends BaseService<JobseekerAwardDocument>{
  constructor(
    @InjectModel(JobseekerAward.name)
    private jobseekerAwardModel: Model<JobseekerAwardDocument>,
  ) {
    super(jobseekerAwardModel);
  }
}
