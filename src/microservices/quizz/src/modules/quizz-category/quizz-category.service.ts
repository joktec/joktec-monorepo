import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QuizzCategory,
  QuizzCategoryDocument,
} from './schemas/quizz-category.schema';
@Injectable()
export class QuizzCategoryService extends BaseService<QuizzCategoryDocument> {
  constructor(
    @InjectModel(QuizzCategory.name)
    private quizzCategoryModel: Model<QuizzCategoryDocument>,
  ) {
    super(quizzCategoryModel);
  }
}
