import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BaseService,
  CacheTtlSeconds,
  generateRedisCacheKey,
  ListQuery,
  Query,
} from '@jobhopin/core';
import {
  TagFunction,
  TagFunctionDocument,
} from './schemas/tag-function.schema';
import { TagSubFunctionService } from '../tag-sub-function/tag-sub-function.service';
import { forwardRef, Inject } from '@nestjs/common';
import { RedisCacheKey } from '@app/app.constants';
import { Cacheable } from 'type-cacheable';

export class TagFunctionService extends BaseService<TagFunctionDocument> {
  constructor(
    @InjectModel(TagFunction.name)
    private tagFunctionModel: Model<TagFunctionDocument>,
    @Inject(forwardRef(() => TagSubFunctionService))
    private readonly tagSubFunctionService: TagSubFunctionService,
  ) {
    super(tagFunctionModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.TAG_FUNCTION_MISC, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async misc() {
    const items = await this.findAll({
      limit: 0,
      sort: 'priority',
    } as ListQuery);
    const tagSubFunctions = await this.tagSubFunctionService.findAll({
      query: { functionId: items.map((it) => it.sqlId) } as any,
      limit: 0,
      sort: 'priority',
    } as ListQuery);
    return items.map((it) => ({
      code: it.code,
      id: it.sqlId,
      localizedName: {
        en: it.nameEng,
        vi: it.name,
      },
      name: it.name,
      nameEng: it.nameEng,
      priority: it.priority,
      value: `${it.sqlId}`,
      tag_sub_function: tagSubFunctions
        .filter((tsf) => tsf.functionId === +it.sqlId)
        .map((tsf) => ({
          code: tsf.code,
          id: +tsf.sqlId,
          localizedName: {
            en: tsf.nameEng,
            vi: tsf.name,
          },
          name: tsf.name,
          nameEng: tsf.nameEng,
          priority: tsf.priority,
          value: `${tsf.sqlId}`,
        })),
    }));
  }
}
