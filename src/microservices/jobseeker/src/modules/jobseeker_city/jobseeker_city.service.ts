import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobseekerCityDto } from './dto/create-jobseeker_city.dto';
import { UpdateJobseekerCityDto } from './dto/update-jobseeker_city.dto';
import { JobseekerCity, JobseekerCityDocument } from './schemas/jobseeker_city.schema';

@Injectable()
export class JobseekerCityService extends BaseService<JobseekerCityDocument>{
  constructor(
    @InjectModel(JobseekerCity.name)
    private jobseekerCityModel: Model<JobseekerCityDocument>,
  ) {
    super(jobseekerCityModel);
  }
}
