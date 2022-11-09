import {
  JobInterview,
  JobInterviewDocument,
} from './schemas/job-interview.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobInterviewService extends BaseService<JobInterviewDocument> {
  constructor(
    @InjectModel(JobInterview.name)
    private readonly mainModel: Model<JobInterviewDocument>,
  ) {
    super(mainModel);
  }
}
