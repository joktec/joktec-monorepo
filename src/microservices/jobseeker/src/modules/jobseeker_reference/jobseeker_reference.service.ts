import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerReference, JobseekerReferenceDocument } from './schemas/jobseeker_reference.schema';

@Injectable()
export class JobseekerReferenceService extends BaseService<JobseekerReferenceDocument>{
    constructor(
      @InjectModel(JobseekerReference.name)
      private jobseekerReferenceModel: Model<JobseekerReferenceDocument>,
    ) {
      super(jobseekerReferenceModel);
    }
}
