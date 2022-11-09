import {
  QuestionCategory,
  QuestionCategoryDocument,
} from './schemas/question-category.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class QuestionCategoryService extends BaseService<QuestionCategoryDocument> {
  constructor(
    @InjectModel(QuestionCategory.name)
    private questionCategoryModel: Model<QuestionCategoryDocument>,
  ) {
    super(questionCategoryModel);
  }
}
