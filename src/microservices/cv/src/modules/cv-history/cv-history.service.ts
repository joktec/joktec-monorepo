import { Model } from 'mongoose';
import { CvHistory, CvHistoryDocument } from './schemas/cv-history.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvHistoryService extends BaseService<CvHistoryDocument> {
  constructor(
    @InjectModel(CvHistory.name)
    private cvModel: Model<CvHistoryDocument>,
  ) {
    super(cvModel);
  }
}
