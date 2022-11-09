import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerAddressGPlace, JobseekerAddressGPlaceDocument } from './schemas/jobseeker_address_g_place.schema';

@Injectable()
export class JobseekerAddressGPlaceService extends BaseService<JobseekerAddressGPlaceDocument>{
  constructor(
    @InjectModel(JobseekerAddressGPlace.name)
    private jobseekerAddressGPlaceModel: Model<JobseekerAddressGPlaceDocument>,
  ) {
    super(jobseekerAddressGPlaceModel);
  }
}
