import {
  CandidateFeedbackGroupContent,
  CandidateFeedbackGroupContentDocument,
} from './schemas/candidate-feedback-group-content.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateFeedbackGroupContentService extends BaseService<CandidateFeedbackGroupContentDocument> {
  constructor(
    @InjectModel(CandidateFeedbackGroupContent.name)
    private candidateModel: Model<CandidateFeedbackGroupContentDocument>,
  ) {
    super(candidateModel);
  }
}
