import {
  CandidateFeedbackItemContent,
  CandidateFeedbackItemContentDocument,
} from './schemas/candidate-feedback-item-content.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateFeedbackItemContentService extends BaseService<CandidateFeedbackItemContentDocument> {
  constructor(
    @InjectModel(CandidateFeedbackItemContent.name)
    private candidateModel: Model<CandidateFeedbackItemContentDocument>,
  ) {
    super(candidateModel);
  }
}
