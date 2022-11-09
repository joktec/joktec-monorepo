import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BannerDocument } from './schemas/banner.schema';
import { NAME } from './banner.constants';
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseService,
  CacheTtlSeconds,
  generateRedisCacheKey,
  ICustomConditionQuery,
} from '@jobhopin/core';
import { RedisCacheKey } from '@app/app.constants';
import { Cacheable } from 'type-cacheable';
export class BannerService extends BaseService<BannerDocument> {
  constructor(@InjectModel(NAME) private bannerModel: Model<BannerDocument>) {
    super(bannerModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.BANNER_QUERY, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async query(
    condition: BaseConditionInput,
    pagination: BasePaginationInput,
    customCondition?: ICustomConditionQuery,
  ): Promise<any> {
    return super.query(condition, pagination, customCondition);
  }
}
