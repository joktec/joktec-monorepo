import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerJobFunction, JobseekerJobFunctionDocument } from './schemas/jobseeker_job_function.schema';

@Injectable()
export class JobseekerJobFunctionService extends BaseService<JobseekerJobFunctionDocument>{
  constructor(
    @InjectModel(JobseekerJobFunction.name)
    private jobseekerJobFunctionModel: Model<JobseekerJobFunctionDocument>,
  ) {
    super(jobseekerJobFunctionModel);
  }
}
