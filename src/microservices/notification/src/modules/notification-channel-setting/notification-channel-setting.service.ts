import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationChannelSetting,
  NotificationChannelSettingDocument,
} from './schemas/notification-channel-setting.schema';

@Injectable()
export class NotificationChannelSettingService extends BaseService<NotificationChannelSettingDocument> {
  constructor(
    @InjectModel(NotificationChannelSetting.name)
    private notificationChannelSettingModel: Model<NotificationChannelSettingDocument>,
  ) {
    super(notificationChannelSettingModel);
  }
}
