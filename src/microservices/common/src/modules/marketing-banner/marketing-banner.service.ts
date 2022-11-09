import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { MarketingBannerDocument } from './schemas/marketing-banner.schema';
import { NAME } from './marketing-banner.constants';

export class MarketingBannerService extends BaseService<MarketingBannerDocument> {
  constructor(
    @InjectModel(NAME) private marketingBannerModel: Model<MarketingBannerDocument>,
  ) {
    super(marketingBannerModel);
  }
}
