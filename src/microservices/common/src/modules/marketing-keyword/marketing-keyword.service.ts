import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { MarketingKeywordDocument } from './schemas/marketing-keyword.schema';
import { NAME } from './marketing-keyword.constants';

export class MarketingKeywordService extends BaseService<MarketingKeywordDocument> {
  constructor(
    @InjectModel(NAME) private marketingKeywordModel: Model<MarketingKeywordDocument>,
  ) {
    super(marketingKeywordModel);
  }
}
