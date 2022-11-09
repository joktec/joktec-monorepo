import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PushNotificationsGcmdevice,
  PushNotificationsGcmdeviceDocument,
} from './schemas/push-notifications-gcmdevice.schema';

@Injectable()
export class PushNotificationsGcmdeviceService extends BaseService<PushNotificationsGcmdeviceDocument> {
  constructor(
    @InjectModel(PushNotificationsGcmdevice.name)
    private pushNotificationsGcmdeviceModel: Model<PushNotificationsGcmdeviceDocument>,
  ) {
    super(pushNotificationsGcmdeviceModel);
  }
}
