import {
  RecruiterJobjmcredit,
  RecruiterJobjmcreditDocument,
} from './schemas/recruiter-jobjmcredit.schema';
import {
  BaseService,
  RecruiterJobjmcreditConditionInput,
  RecruiterJobjmcreditPaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecruiterJobjmcreditService extends BaseService<
  RecruiterJobjmcreditDocument,
  RecruiterJobjmcreditConditionInput,
  RecruiterJobjmcreditPaginationInput
> {
  constructor(
    @InjectModel(RecruiterJobjmcredit.name)
    private recruiterJobjmcreditModel: Model<RecruiterJobjmcreditDocument>,
  ) {
    super(recruiterJobjmcreditModel);
  }
}
