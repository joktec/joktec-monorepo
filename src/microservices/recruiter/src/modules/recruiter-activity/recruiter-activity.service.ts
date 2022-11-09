import {
  BaseService,
  RecruiterActivityConditionInput,
  RecruiterActivityPaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RecruiterActivity,
  RecruiterActivityDocument,
} from './schemas/recruiter-activity.schema';

@Injectable()
export class RecruiterActivityService extends BaseService<
  RecruiterActivityDocument,
  RecruiterActivityConditionInput
> {
  constructor(
    @InjectModel(RecruiterActivity.name)
    private recruiterActivityModel: Model<RecruiterActivityDocument>,
  ) {
    super(recruiterActivityModel);
  }
}
