import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LocationType,
  LocationTypeDocument,
} from './schemas/location-type.schema';
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
export class LocationTypeService extends BaseService<LocationTypeDocument> {
  constructor(
    @InjectModel(LocationType.name)
    private locationTypeModel: Model<LocationTypeDocument>,
  ) {
    super(locationTypeModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.LOCATION_TYPE_QUERY, args),
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
