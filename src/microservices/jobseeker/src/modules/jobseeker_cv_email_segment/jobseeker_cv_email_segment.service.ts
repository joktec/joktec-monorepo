import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerCvEmailSegment, JobseekerCvEmailSegmentDocument } from './schemas/jobseeker_cv_email_segment.schema';

@Injectable()
export class JobseekerCvEmailSegmentService extends BaseService<JobseekerCvEmailSegmentDocument>{
  constructor(
    @InjectModel(JobseekerCvEmailSegment.name)
    private jobseekerCvEmailSegmentModel: Model<JobseekerCvEmailSegmentDocument>,
  ) {
    super(jobseekerCvEmailSegmentModel);
  }
}
