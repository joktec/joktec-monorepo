import {
  QuizzVoteLog,
  QuizzVoteLogDocument,
} from './schemas/quizz-vote-log.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizzVoteLogService extends BaseService<QuizzVoteLogDocument> {
  constructor(
    @InjectModel(QuizzVoteLog.name)
    private quizzVoteLogModel: Model<QuizzVoteLogDocument>,
  ) {
    super(quizzVoteLogModel);
  }
}
