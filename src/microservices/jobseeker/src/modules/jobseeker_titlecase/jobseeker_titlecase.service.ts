import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerTitlecase, JobseekerTitlecaseDocument } from './schemas/jobseeker_titlecase.schema';

@Injectable()
export class JobseekerTitlecaseService extends BaseService<JobseekerTitlecaseDocument>{
  constructor(
    @InjectModel(JobseekerTitlecase.name)
    private jobseekerTitlecaseDocumentModel: Model<JobseekerTitlecaseDocument>,
  ) {
    super(jobseekerTitlecaseDocumentModel);
  }
}
