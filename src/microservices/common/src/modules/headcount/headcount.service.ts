import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Headcount, HeadcountDocument } from './schemas/headcount.schema';
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
export class HeadcountService extends BaseService<HeadcountDocument> {
  constructor(
    @InjectModel(Headcount.name)
    private HeadcountModel: Model<HeadcountDocument>,
  ) {
    super(HeadcountModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.HEADCOUNT_QUERY, args),
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
