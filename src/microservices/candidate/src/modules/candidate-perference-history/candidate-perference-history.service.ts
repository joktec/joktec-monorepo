import {
  CandidatePerferenceHistory,
  CandidatePerferenceHistoryDocument,
} from './schemas/candidate-perference-history.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidatePerferenceHistoryService extends BaseService<CandidatePerferenceHistoryDocument> {
  constructor(
    @InjectModel(CandidatePerferenceHistory.name)
    private candidateModel: Model<CandidatePerferenceHistoryDocument>,
  ) {
    super(candidateModel);
  }
}
