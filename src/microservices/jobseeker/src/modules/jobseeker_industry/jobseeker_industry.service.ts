import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerIndustry, JobseekerIndustryDocument } from './schemas/jobseeker_industry.schema';

@Injectable()
export class JobseekerIndustryService extends BaseService<JobseekerIndustryDocument>{
  constructor(
    @InjectModel(JobseekerIndustry.name)
    private jobseekerIndustryModel: Model<JobseekerIndustryDocument>,
  ) {
    super(jobseekerIndustryModel);
  }
}
