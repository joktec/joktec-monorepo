import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerLocation, JobseekerLocationDocument } from './schemas/jobseeker_location.schema';

@Injectable()
export class JobseekerLocationService extends BaseService<JobseekerLocationDocument>{
  constructor(
    @InjectModel(JobseekerLocation.name)
    private jobseekerLocationModel: Model<JobseekerLocationDocument>,
  ) {
    super(jobseekerLocationModel);
  }
}
