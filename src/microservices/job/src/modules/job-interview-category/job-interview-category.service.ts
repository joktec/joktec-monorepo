import {
  JobInterviewCategory,
  JobInterviewCategoryDocument,
} from './schemas/job-interview-category.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobInterviewCategoryService extends BaseService<JobInterviewCategoryDocument> {
  constructor(
    @InjectModel(JobInterviewCategory.name)
    private readonly mainModel: Model<JobInterviewCategoryDocument>,
  ) {
    super(mainModel);
  }
}
