import {
  CandidateAttach,
  CandidateAttachDocument,
} from './schemas/candidate-attach.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CandidateAttachService extends BaseService<CandidateAttachDocument> {
  constructor(
    @InjectModel(CandidateAttach.name)
    private candidateAttachModel: Model<CandidateAttachDocument>,
  ) {
    super(candidateAttachModel);
  }
}
