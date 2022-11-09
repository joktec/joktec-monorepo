import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerViewProfile, JobseekerViewProfileDocument } from './schemas/jobseeker_view_profile.schema';

@Injectable()
export class JobseekerViewProfileService extends BaseService<JobseekerViewProfileDocument>{
  constructor(
    @InjectModel(JobseekerViewProfile.name)
    private jobseekerViewProfileModel: Model<JobseekerViewProfileDocument>,
  ) {
    super(jobseekerViewProfileModel);
  }
}
