import {
  JobhopJobCategory,
  JobhopJobCategoryDocument,
} from './schemas/jobhop-jobcategory.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopJobCategoryService extends BaseService<JobhopJobCategoryDocument> {
  constructor(
    @InjectModel(JobhopJobCategory.name)
    private readonly mainModel: Model<JobhopJobCategoryDocument>,
  ) {
    super(mainModel);
  }
}
