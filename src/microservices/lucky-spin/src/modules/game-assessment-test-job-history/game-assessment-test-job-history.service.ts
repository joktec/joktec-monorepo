import {
  GameAssessmentTestJobHistory,
  GameAssessmentTestJobHistoryDocument,
} from './schemas/game-assessment-test-job-history.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class GameAssessmentTestJobHistoryService extends BaseService<GameAssessmentTestJobHistoryDocument> {
  constructor(
    @InjectModel(GameAssessmentTestJobHistory.name)
    private mainModel: Model<GameAssessmentTestJobHistoryDocument>,
  ) {
    super(mainModel);
  }

  async findByUser(query) {
    return await this.mainModel.find(query).exec();
  }
}
