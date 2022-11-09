import { Model } from 'mongoose';
import { CvScore, CvScoreDocument } from './schemas/cv-score.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvScoreService extends BaseService<CvScoreDocument> {
  constructor(
    @InjectModel(CvScore.name)
    private cvModel: Model<CvScoreDocument>,
  ) {
    super(cvModel);
  }
}
