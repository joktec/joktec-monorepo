import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { SourceDocument } from './schemas/source.schema';
import { NAME } from './source.constants';

export class SourceService extends BaseService<SourceDocument> {
  constructor(
    @InjectModel(NAME) private sourceModel: Model<SourceDocument>,
  ) {
    super(sourceModel);
  }
}
