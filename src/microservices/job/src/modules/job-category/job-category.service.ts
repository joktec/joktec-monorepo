import {
  JobCategory,
  JobCategoryDocument,
} from './schemas/job-category.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobCategoryService extends BaseService<JobCategoryDocument> {
  constructor(
    @InjectModel(JobCategory.name)
    private readonly mainModel: Model<JobCategoryDocument>,
  ) {
    super(mainModel);
  }
}
