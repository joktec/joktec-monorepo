import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerJobExpected, JobseekerJobExpectedDocument } from './schemas/jobseeker_job_expected.schema';

@Injectable()
export class JobseekerJobExpectedService extends BaseService<JobseekerJobExpectedDocument>{
  constructor(
    @InjectModel(JobseekerJobExpected.name)
    private jobseekerJobExpectedModel: Model<JobseekerJobExpectedDocument>,
  ) {
    super(jobseekerJobExpectedModel);
  }
}
