import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerCv, JobseekerCvDocument } from './schemas/jobseeker_cv.schema';

@Injectable()
export class JobseekerCvService extends BaseService<JobseekerCvDocument>{
  constructor(
    @InjectModel(JobseekerCv.name)
    private jobseekerCvModel: Model<JobseekerCvDocument>,
  ) {
    super(jobseekerCvModel);
  }
}
