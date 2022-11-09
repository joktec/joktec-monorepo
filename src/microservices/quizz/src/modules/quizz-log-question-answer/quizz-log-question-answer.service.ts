import {
  QuizzLogQuestionAnswer,
  QuizzLogQuestionAnswerDocument,
} from './schemas/quizz-log-question-answer.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class QuizzLogQuestionAnswerService extends BaseService<QuizzLogQuestionAnswerDocument> {
  constructor(
    @InjectModel(QuizzLogQuestionAnswer.name)
    private quizzCategoryModel: Model<QuizzLogQuestionAnswerDocument>,
  ) {
    super(quizzCategoryModel);
  }
}
