import {
  QuizzQuestionMedia,
  QuizzQuestionMediaDocument,
} from './schemas/quizz-question-media.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class QuizzQuestionMediaService extends BaseService<QuizzQuestionMediaDocument> {
  constructor(
    @InjectModel(QuizzQuestionMedia.name)
    private quizzQuestionMediaModel: Model<QuizzQuestionMediaDocument>,
  ) {
    super(quizzQuestionMediaModel);
  }
}
