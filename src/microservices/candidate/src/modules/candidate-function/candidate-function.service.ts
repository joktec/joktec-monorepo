import {
  CandidateFunction,
  CandidateFunctionDocument,
} from './schemas/candidate-function.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateFunctionService extends BaseService<CandidateFunctionDocument> {
  constructor(
    @InjectModel(CandidateFunction.name)
    private candidateModel: Model<CandidateFunctionDocument>,
  ) {
    super(candidateModel);
  }
}
