import {
  CandidateLocation,
  CandidateLocationDocument,
} from './schemas/candidate-location.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateLocationService extends BaseService<CandidateLocationDocument> {
  constructor(
    @InjectModel(CandidateLocation.name)
    private candidateModel: Model<CandidateLocationDocument>,
  ) {
    super(candidateModel);
  }
}
