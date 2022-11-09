import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerJobReferral, JobseekerJobReferralDocument } from './schemas/jobseeker_job_referral.schema';

@Injectable()
export class JobseekerJobReferralService extends BaseService<JobseekerJobReferralDocument>{
  constructor(
    @InjectModel(JobseekerJobReferral.name)
    private jobseekerJobReferralModel: Model<JobseekerJobReferralDocument>,
  ) {
    super(jobseekerJobReferralModel);
  }
}
