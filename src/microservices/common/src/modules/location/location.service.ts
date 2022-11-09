import { forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseService,
  CacheTtlSeconds,
  ICustomConditionQuery,
  generateRedisCacheKey,
  ListQuery,
} from '@jobhopin/core';
import { Location, LocationDocument } from './schemas/location.schema';
import { Cacheable } from 'type-cacheable';
import { RedisCacheKey } from '@app/app.constants';
import { LocationTypeService } from '../location-type/location-type.service';

export class LocationService extends BaseService<LocationDocument> {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    @Inject(forwardRef(() => LocationTypeService))
    private readonly locationTypeService: LocationTypeService,
  ) {
    super(locationModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.LOCATION_QUERY, args),
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
