import {
  CandidateLink,
  CandidateLinkDocument,
} from './schemas/candidate-link.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateLinkService extends BaseService<CandidateLinkDocument> {
  constructor(
    @InjectModel(CandidateLink.name)
    private candidateModel: Model<CandidateLinkDocument>,
  ) {
    super(candidateModel);
  }
}
