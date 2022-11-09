import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { SortType, SortTypeDocument } from './schemas/sort-type.schema';

export class SortTypeService extends BaseService<SortTypeDocument> {
  constructor(
    @InjectModel(SortType.name) private sortTypeModel: Model<SortTypeDocument>,
  ) {
    super(sortTypeModel);
  }
}
