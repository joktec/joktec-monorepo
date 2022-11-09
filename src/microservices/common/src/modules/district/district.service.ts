import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DistrictDocument } from './schemas/district.schema';
import { NAME } from './district.constants';
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

export class DistrictService extends BaseService<DistrictDocument> {
  constructor(
    @InjectModel(NAME) private districtModel: Model<DistrictDocument>,
  ) {
    super(districtModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.DISTRICT_QUERY, args),
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
