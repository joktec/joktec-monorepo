import {
  CandidateFeedbackGroup,
  CandidateFeedbackGroupDocument,
} from './schemas/candidate-feedback-group.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateFeedbackGroupService extends BaseService<CandidateFeedbackGroupDocument> {
  constructor(
    @InjectModel(CandidateFeedbackGroup.name)
    private candidateFeedbackGroupModel: Model<CandidateFeedbackGroupDocument>,
  ) {
    super(candidateFeedbackGroupModel);
  }
}
