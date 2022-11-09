import {
  BaseService,
  RecruiterConditionInput,
  RecruiterPaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recruiter, RecruiterDocument } from './schemas/recruiter.schema';

@Injectable()
export class RecruiterService extends BaseService<
  RecruiterDocument,
  RecruiterConditionInput,
  RecruiterPaginationInput
> {
  constructor(
    @InjectModel(Recruiter.name)
    private recruiterModel: Model<RecruiterDocument>,
  ) {
    super(recruiterModel);
  }
}
