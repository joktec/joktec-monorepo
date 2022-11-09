import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerJobType, JobseekerJobTypeDocument } from './schemas/jobseeker_job_type.schema';

@Injectable()
export class JobseekerJobTypeService extends BaseService<JobseekerJobTypeDocument>{
  constructor(
    @InjectModel(JobseekerJobType.name)
    private JobseekerJobTypeModel: Model<JobseekerJobTypeDocument>,
  ) {
    super(JobseekerJobTypeModel);
  }
}
