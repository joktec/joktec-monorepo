import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language, LanguageDocument } from './schemas/language.schema';
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseService,
  CacheTtlSeconds,
  generateRedisCacheKey,
  ICustomConditionQuery,
  ListQuery,
} from '@jobhopin/core';
import { RedisCacheKey } from '@app/app.constants';
import { Cacheable } from 'type-cacheable';
export class LanguageService extends BaseService<LanguageDocument> {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>,
  ) {
    super(languageModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.LANGUAGE_QUERY, args),
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
