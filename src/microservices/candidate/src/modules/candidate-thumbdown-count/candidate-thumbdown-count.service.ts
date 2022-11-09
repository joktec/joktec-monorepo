import {
  CandidateThumbdownCount,
  CandidateThumbdownCountDocument,
} from './schemas/candidate-thumbdown-count.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateThumbdownCountService extends BaseService<CandidateThumbdownCountDocument> {
  constructor(
    @InjectModel(CandidateThumbdownCount.name)
    private candidateModel: Model<CandidateThumbdownCountDocument>,
  ) {
    super(candidateModel);
  }
}
