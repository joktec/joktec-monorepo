import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';

import {
  UserSetting,
  UserSettingDocument,
} from './schemas/user-settings.schema';

export class UserSettingService extends BaseService<UserSettingDocument> {
  constructor(
    @InjectModel(UserSetting.name)
    private userSettingModel: Model<UserSettingDocument>,
  ) {
    super(userSettingModel);
  }
}
