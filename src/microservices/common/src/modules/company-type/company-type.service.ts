import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CompanyType,
  CompanyTypeDocument,
} from './schemas/company-type.schema';
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
export class CompanyTypeService extends BaseService<CompanyTypeDocument> {
  constructor(
    @InjectModel(CompanyType.name)
    private companyTypeModel: Model<CompanyTypeDocument>,
  ) {
    super(companyTypeModel);
  }

  // @Cacheable({
  //   cacheKey: (args: any[]) =>
  //     generateRedisCacheKey(RedisCacheKey.COMPANY_TYPE_QUERY, args),
  //   ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  // })
  async query(
    condition: BaseConditionInput,
    pagination: BasePaginationInput,
    customCondition?: ICustomConditionQuery,
  ): Promise<any> {
    return super.query(condition, pagination, customCondition);
  }
}
