import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  QuizzQuestion,
  QuizzQuestionDocument,
} from './schemas/quizz-question.schema';
@Injectable()
export class QuizzQuestionService extends BaseService<QuizzQuestionDocument> {
  constructor(
    @InjectModel(QuizzQuestion.name)
    private quizzQuestionModel: Model<QuizzQuestionDocument>,
  ) {
    super(quizzQuestionModel);
  }
}
