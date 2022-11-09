import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { MarketingSeoKeywordDocument } from './schemas/marketing-seo-keyword.schema';
import { NAME } from './marketing-seo-keyword.constants';

export class MarketingSeoKeywordService extends BaseService<MarketingSeoKeywordDocument> {
  constructor(
    @InjectModel(NAME) private marketingSeoKeywordModel: Model<MarketingSeoKeywordDocument>,
  ) {
    super(marketingSeoKeywordModel);
  }
}
