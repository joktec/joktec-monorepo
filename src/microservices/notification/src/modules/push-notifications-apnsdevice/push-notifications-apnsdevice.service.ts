import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PushNotificationsApnsdevice,
  PushNotificationsApnsdeviceDocument,
} from './schemas/push-notifications-apnsdevice.schema';

@Injectable()
export class PushNotificationsApnsdeviceService extends BaseService<PushNotificationsApnsdeviceDocument> {
  constructor(
    @InjectModel(PushNotificationsApnsdevice.name)
    private pushNotificationsApnsdeviceModel: Model<PushNotificationsApnsdeviceDocument>,
  ) {
    super(pushNotificationsApnsdeviceModel);
  }
}
