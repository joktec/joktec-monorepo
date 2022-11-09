import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PushNotificationsWnsdevice,
  PushNotificationsWnsdeviceDocument,
} from './schemas/push-notifications-wnsdevice.schema';

@Injectable()
export class PushNotificationsWnsdeviceService extends BaseService<PushNotificationsWnsdeviceDocument> {
  constructor(
    @InjectModel(PushNotificationsWnsdevice.name)
    private pushNotificationsWnsdeviceModel: Model<PushNotificationsWnsdeviceDocument>,
  ) {
    super(pushNotificationsWnsdeviceModel);
  }
}
