import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerLevelExpected, JobseekerLevelExpectedDocument } from './schemas/jobseeker_level_expected.schema';

@Injectable()
export class JobseekerLevelExpectedService extends BaseService<JobseekerLevelExpectedDocument>{
  constructor(
    @InjectModel(JobseekerLevelExpected.name)
    private jobseekerLevelExpectedModel: Model<JobseekerLevelExpectedDocument>,
  ) {
    super(jobseekerLevelExpectedModel);
  }
}
