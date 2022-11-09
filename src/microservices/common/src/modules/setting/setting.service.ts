import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { SettingDocument } from './schemas/setting.schema';
import { NAME } from './setting.constants';

export class SettingService extends BaseService<SettingDocument> {
  constructor(
    @InjectModel(NAME) private settingModel: Model<SettingDocument>,
  ) {
    super(settingModel);
  }
}
