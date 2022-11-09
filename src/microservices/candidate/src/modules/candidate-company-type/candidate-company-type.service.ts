import {
  CandidateCompanyType,
  CandidateCompanyTypeDocument,
} from './schemas/candidate-company-type.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateCompanyTypeService extends BaseService<CandidateCompanyTypeDocument> {
  constructor(
    @InjectModel(CandidateCompanyType.name)
    private candidateCompanyTypeModel: Model<CandidateCompanyTypeDocument>,
  ) {
    super(candidateCompanyTypeModel);
  }
}
