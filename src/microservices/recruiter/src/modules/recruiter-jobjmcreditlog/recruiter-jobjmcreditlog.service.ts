import {
  BaseService,
  RecruiterJobjmcreditlogConditionInput,
  RecruiterJobjmcreditlogPaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RecruiterJobjmcreditlog,
  RecruiterJobjmcreditlogDocument,
} from './schemas/recruiter-jobjmcreditlog.schema';

@Injectable()
export class RecruiterJobjmcreditlogService extends BaseService<
  RecruiterJobjmcreditlogDocument,
  RecruiterJobjmcreditlogConditionInput,
  RecruiterJobjmcreditlogPaginationInput
> {
  constructor(
    @InjectModel(RecruiterJobjmcreditlog.name)
    private recruiterJobjmcreditlogModel: Model<RecruiterJobjmcreditlogDocument>,
  ) {
    super(recruiterJobjmcreditlogModel);
  }
}
