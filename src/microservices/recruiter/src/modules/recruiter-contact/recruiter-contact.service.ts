import { Injectable } from '@nestjs/common';
import {
  RecruiterContact,
  RecruiterContactDocument,
} from './schemas/recruiter-contact.schema';
import {
  BaseService,
  RecruiterConditionInput,
  RecruiterPaginationInput,
} from '@jobhopin/core';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RecruiterContactService extends BaseService<
  RecruiterContactDocument,
  RecruiterConditionInput,
  RecruiterPaginationInput
> {
  constructor(
    @InjectModel(RecruiterContact.name)
    private recruiterContactModel: Model<RecruiterContactDocument>,
  ) {
    super(recruiterContactModel);
  }
}
