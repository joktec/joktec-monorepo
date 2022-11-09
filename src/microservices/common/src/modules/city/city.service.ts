import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from './schemas/city.schema';
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

export class CityService extends BaseService<CityDocument> {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {
    super(cityModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.CITY_QUERY, args),
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
