import { Model } from 'mongoose';
import {
  CvAnalysicFlow,
  CvAnalysicFlowDocument,
} from './schemas/cv-analysic-flow.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvAnalysicFlowService extends BaseService<CvAnalysicFlowDocument> {
  constructor(
    @InjectModel(CvAnalysicFlow.name)
    private cvModel: Model<CvAnalysicFlowDocument>,
  ) {
    super(cvModel);
  }
}
