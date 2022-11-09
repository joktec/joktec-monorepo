import {
  QuizzLanguage,
  QuizzLanguageDocument,
} from './schemas/quizz-language.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@jobhopin/core';
import { Model } from 'mongoose';

@Injectable()
export class QuizzLanguageService extends BaseService<QuizzLanguageDocument> {
  constructor(
    @InjectModel(QuizzLanguage.name)
    private quizzLanguageModel: Model<QuizzLanguageDocument>,
  ) {
    super(quizzLanguageModel);
  }
}
