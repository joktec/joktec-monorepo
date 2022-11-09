import {
  RecruiterJobjmcreditplan,
  RecruiterJobjmcreditplanDocument,
} from './schemas/recruiter-jobjmcreditplan.schema';
import {
  BaseService,
  RecruiterJobjmcreditplanConditionInput,
  RecruiterJobjmcreditplanPaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RecruiterJobjmcreditplanService extends BaseService<
  RecruiterJobjmcreditplanDocument,
  RecruiterJobjmcreditplanConditionInput,
  RecruiterJobjmcreditplanPaginationInput
> {
  constructor(
    @InjectModel(RecruiterJobjmcreditplan.name)
    private recruiterJobjmcreditplanModel: Model<RecruiterJobjmcreditplanDocument>,
  ) {
    super(recruiterJobjmcreditplanModel);
  }
}
