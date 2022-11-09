import { InjectModel } from '@nestjs/mongoose';
import {
  BaseService,
  RecruiterCandidatestatusmessageConditionInput,
  RecruiterCandidatestatusmessagePaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  RecruiterCandidatestatusmessage,
  RRecruiterCandidatestatusmessageDocument,
} from './schemas/recruiter-candidatestatusmessage.schema';

@Injectable()
export class RecruiterCandidatestatusmessageService extends BaseService<
  RRecruiterCandidatestatusmessageDocument,
  RecruiterCandidatestatusmessageConditionInput,
  RecruiterCandidatestatusmessagePaginationInput
> {
  constructor(
    @InjectModel(RecruiterCandidatestatusmessage.name)
    private recruiterCandiatestatusmessageModel: Model<RRecruiterCandidatestatusmessageDocument>,
  ) {
    super(recruiterCandiatestatusmessageModel);
  }
  ƒ;
}
