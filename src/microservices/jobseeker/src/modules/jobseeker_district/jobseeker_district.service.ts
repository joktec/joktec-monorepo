import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerDistrict, JobseekerDistrictDocument } from './schemas/jobseeker_district.schema';

@Injectable()
export class JobseekerDistrictService extends BaseService<JobseekerDistrictDocument>{
  constructor(
    @InjectModel(JobseekerDistrict.name)
    private jobseekerDistrictModel: Model<JobseekerDistrictDocument>,
  ) {
    super(jobseekerDistrictModel);
  }
}
