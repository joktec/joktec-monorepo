import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { PlatformDocument } from './schemas/platform.schema';
import { NAME } from './platform.constants';

export class PlatformService extends BaseService<PlatformDocument> {
  constructor(
    @InjectModel(NAME) private platformModel: Model<PlatformDocument>,
  ) {
    super(platformModel);
  }
}
