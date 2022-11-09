import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationLog,
  NotificationLogDocument,
} from './schemas/notification-log.schema';

@Injectable()
export class NotificationLogService extends BaseService<NotificationLogDocument> {
  constructor(
    @InjectModel(NotificationLog.name)
    private notificationLogModel: Model<NotificationLogDocument>,
  ) {
    super(notificationLogModel);
  }
}
