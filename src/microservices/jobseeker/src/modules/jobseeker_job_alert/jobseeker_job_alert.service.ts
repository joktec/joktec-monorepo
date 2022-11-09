import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerJobAlert, JobseekerJobAlertDocument } from './schemas/jobseeker_job_alert.schema';

@Injectable()
export class JobseekerJobAlertService extends BaseService<JobseekerJobAlertDocument>{
  constructor(
    @InjectModel(JobseekerJobAlert.name)
    private jobseekerJobAlertModel: Model<JobseekerJobAlertDocument>,
  ) {
    super(jobseekerJobAlertModel);
  }
}
