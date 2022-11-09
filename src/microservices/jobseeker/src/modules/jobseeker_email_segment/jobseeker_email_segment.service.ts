import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerEmailSegment, JobseekerEmailSegmentDocument } from './schemas/jobseeker_email_segment.schema';

@Injectable()
export class JobseekerEmailSegmentService extends BaseService<JobseekerEmailSegmentDocument>{
  constructor(
    @InjectModel(JobseekerEmailSegment.name)
    private jobseekerEmailSegmentModel: Model<JobseekerEmailSegmentDocument>,
  ) {
    super(jobseekerEmailSegmentModel);
  }
}
