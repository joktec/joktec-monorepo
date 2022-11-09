import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PushNotificationsWebpushdevice,
  PushNotificationsWebpushdeviceDocument,
} from './schemas/push-notifications-webpushdevice.schema';

@Injectable()
export class PushNotificationsWebpushdeviceService extends BaseService<PushNotificationsWebpushdeviceDocument> {
  constructor(
    @InjectModel(PushNotificationsWebpushdevice.name)
    private pushNotificationsWebpushdeviceModel: Model<PushNotificationsWebpushdeviceDocument>,
  ) {
    super(pushNotificationsWebpushdeviceModel);
  }
}
