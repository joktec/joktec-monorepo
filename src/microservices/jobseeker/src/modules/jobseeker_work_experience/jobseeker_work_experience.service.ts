import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerWorkExperience, JobseekerWorkExperienceDocument } from './schemas/jobseeker_work_experience.schema';

@Injectable()
export class JobseekerWorkExperienceService extends BaseService<JobseekerWorkExperienceDocument>{
  constructor(
    @InjectModel(JobseekerWorkExperience.name)
    private jobseekerWorkExperienceModel: Model<JobseekerWorkExperienceDocument>,
  ) {
    super(jobseekerWorkExperienceModel);
  }
}
