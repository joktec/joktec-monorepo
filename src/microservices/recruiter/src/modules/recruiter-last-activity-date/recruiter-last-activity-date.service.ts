import {
  BaseService,
  RecruiterLastActivityDateConditionInput,
  RecruiterLastActivityDatePaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RecruiterLastActivityDate,
  RecruiterLastActivityDateDocument,
} from './schemas/recruiter-last-activity-date.schema';

@Injectable()
export class RecruiterLastActivityDateService extends BaseService<
  RecruiterLastActivityDateDocument,
  RecruiterLastActivityDateConditionInput,
  RecruiterLastActivityDatePaginationInput
> {
  constructor(
    @InjectModel(RecruiterLastActivityDate.name)
    private recruiterLastActivityDateModel: Model<RecruiterLastActivityDateDocument>,
  ) {
    super(recruiterLastActivityDateModel);
  }
}
