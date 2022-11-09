import {
  QuizzQuestionAnswer,
  QuizzQuestionAnswerDocument,
} from './schemas/quizz-question-answer.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class QuizzQuestionAnswerService extends BaseService<QuizzQuestionAnswerDocument> {
  constructor(
    @InjectModel(QuizzQuestionAnswer.name)
    private quizzQuestionAnswerModel: Model<QuizzQuestionAnswerDocument>,
  ) {
    super(quizzQuestionAnswerModel);
  }
}
