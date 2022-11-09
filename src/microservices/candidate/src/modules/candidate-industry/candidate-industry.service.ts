import {
  CandidateIndustry,
  CandidateIndustryDocument,
} from './schemas/candidate-industry.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateIndustryService extends BaseService<CandidateIndustryDocument> {
  constructor(
    @InjectModel(CandidateIndustry.name)
    private candidateModel: Model<CandidateIndustryDocument>,
  ) {
    super(candidateModel);
  }
}
