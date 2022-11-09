import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DegreeDocument } from './schemas/degree.schema';
import { NAME } from './degree.constants';
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

export class DegreeService extends BaseService<DegreeDocument> {
  constructor(@InjectModel(NAME) private degreeModel: Model<DegreeDocument>) {
    super(degreeModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.DEGREE_QUERY, args),
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
