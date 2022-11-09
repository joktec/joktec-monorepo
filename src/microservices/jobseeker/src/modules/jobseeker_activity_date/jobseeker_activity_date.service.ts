import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { JobseekerActivityDate, JobseekerActivityDateDocument } from './schemas/jobseeker_activity_date.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class JobseekerActivityDateService extends BaseService<JobseekerActivityDateDocument>{
  constructor(
    @InjectModel(JobseekerActivityDate.name)
    private jobseekerActivityDateDocument: Model<JobseekerActivityDateDocument>,
  ) {
    super(jobseekerActivityDateDocument);
  }
}
