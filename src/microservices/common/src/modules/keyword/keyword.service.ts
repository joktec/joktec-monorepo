import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { Keyword, KeywordDocument } from './schemas/keyword.schema';
export class KeywordService extends BaseService<KeywordDocument> {
  constructor(
    @InjectModel(Keyword.name) private levelModel: Model<KeywordDocument>,
  ) {
    super(levelModel);
  }
}
