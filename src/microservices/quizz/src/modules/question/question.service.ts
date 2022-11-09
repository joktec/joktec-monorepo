import { Question, QuestionDocument } from './schemas/question.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class QuestionService extends BaseService<QuestionDocument> {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {
    super(questionModel);
  }
}
