import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerEducation, JobseekerEducationDocument } from './schemas/jobseeker_education.schema';

@Injectable()
export class JobseekerEducationService extends BaseService<JobseekerEducationDocument>{
  constructor(
    @InjectModel(JobseekerEducation.name)
    private jobseekerEducationModel: Model<JobseekerEducationDocument>,
  ) {
    super(jobseekerEducationModel);
  }
}
