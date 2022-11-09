import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService, ListQuery, Query } from '@jobhopin/core';
import { TagSubFunction, TagSubFunctionDocument } from './schemas/tag-sub-function.schema';

export class TagSubFunctionService extends BaseService<TagSubFunctionDocument> {
  constructor(
    @InjectModel(TagSubFunction.name) private tagSubFunctionModel: Model<TagSubFunctionDocument>,
  ) {
    super(tagSubFunctionModel);
  }
}