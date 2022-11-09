import { QuizzEvent, QuizzEventDocument } from './schemas/quizz-event.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class QuizzEventService extends BaseService<QuizzEventDocument> {
  constructor(
    @InjectModel(QuizzEvent.name)
    private quizzCategoryModel: Model<QuizzEventDocument>,
  ) {
    super(quizzCategoryModel);
  }
}
