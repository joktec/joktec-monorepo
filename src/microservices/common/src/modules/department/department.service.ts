import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepartmentDocument } from './schemas/department.schema';
import { NAME } from './department.constants';
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
export class DepartmentService extends BaseService<DepartmentDocument> {
  constructor(
    @InjectModel(NAME) private departmentModel: Model<DepartmentDocument>,
  ) {
    super(departmentModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.DEPARTMENT_QUERY, args),
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
