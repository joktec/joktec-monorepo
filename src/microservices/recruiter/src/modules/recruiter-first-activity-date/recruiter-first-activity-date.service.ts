import {
  BaseService,
  RecruiterFirstActivityDatePaginationInput,
  RecruiterFirstActivityDateConditionInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RecruiterFirstActivityDate,
  RecruiterFirstActivityDateDocument,
} from './schemas/recruiter-first-activity-date.schema';

@Injectable()
export class RecruiterFirstActivityDateService extends BaseService<
  RecruiterFirstActivityDateDocument,
  RecruiterFirstActivityDateConditionInput,
  RecruiterFirstActivityDatePaginationInput
> {
  constructor(
    @InjectModel(RecruiterFirstActivityDate.name)
    private recruiterFirstActivityDateModel: Model<RecruiterFirstActivityDateDocument>,
  ) {
    super(recruiterFirstActivityDateModel);
  }
}
