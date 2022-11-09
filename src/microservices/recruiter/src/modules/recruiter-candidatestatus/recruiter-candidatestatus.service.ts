import {
  BaseService,
  RecruiterCandidatestatusConditionInput,
  RecruiterCandidatestatusPaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RecruiterCandidatestatus,
  RecruiterCandidatestatusDocument,
} from './schemas/recruiter-candidatestatus.schema';

@Injectable()
export class RecruiterCandidatestatusService extends BaseService<
  RecruiterCandidatestatusDocument,
  RecruiterCandidatestatusConditionInput,
  RecruiterCandidatestatusPaginationInput
> {
  constructor(
    @InjectModel(RecruiterCandidatestatus.name)
    private recruiterCandidatestatusModel: Model<RecruiterCandidatestatusDocument>,
  ) {
    super(recruiterCandidatestatusModel);
  }
}
