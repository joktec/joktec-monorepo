import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService, ListQuery } from '@jobhopin/core';
import { IndustryDocument } from './schemas/industry.schema';
import { NAME } from './industry.constants';
import {
  BaseConditionInput,
  BasePaginationInput,
  CacheTtlSeconds,
  generateRedisCacheKey,
  ICustomConditionQuery,
} from '@jobhopin/core';
import { Cacheable } from 'type-cacheable';
import { RedisCacheKey } from '@app/app.constants';
export class IndustryService extends BaseService<IndustryDocument> {
  constructor(
    @InjectModel(NAME) private industryModel: Model<IndustryDocument>,
  ) {
    super(industryModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.INDUSTRY_QUERY, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async query(
    condition: BaseConditionInput,
    pagination: BasePaginationInput,
    customCondition?: ICustomConditionQuery,
  ): Promise<any> {
    return super.query(condition, pagination, customCondition);
  }

  async fptoTopIndustry() {
    const items = await this.findAll({
      query: { isFptoTop: 1, isFptoActive: 1 } as any,
      limit: 0,
      sort: 'priorityTop',
    } as ListQuery);
    return items.map((it) => ({
      id: `${it.sqlId}`,
      value: `${it.sqlId}`,
      name: it.name,
      code: it.code,
      urlCode: it.urlCode,
      localizedName: {
        vi: it.name,
        en: it.nameEng,
      },
      logo: it.logo,
      logoColor: it.logoColor,
      image: it.image,
      imageHighlight: it.imageHighlight,
      priority: it.priorityTop,
      industryCode: it.code,
      isActive: it.isFptoActive,
    }));
  }
}
