import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QuizzActionLog,
  QuizzActionLogDocument,
} from './schemas/quizz-action-log.schema';

@Injectable()
export class QuizzActionLogService extends BaseService<QuizzActionLogDocument> {
  constructor(
    @InjectModel(QuizzActionLog.name)
    private quizzActionLogModel: Model<QuizzActionLogDocument>,
  ) {
    super(quizzActionLogModel);
  }
}
