import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerJobSaved, JobseekerJobSavedDocument } from './schemas/jobseeker_job_saved.schema';

@Injectable()
export class JobseekerJobSavedService extends BaseService<JobseekerJobSavedDocument>{
  constructor(
    @InjectModel(JobseekerJobSaved.name)
    private jobseekerJobSavedModel: Model<JobseekerJobSavedDocument>,
  ) {
    super(jobseekerJobSavedModel);
  }
}
