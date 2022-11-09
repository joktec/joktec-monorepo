import {
  BlogNotificationLog,
  BlogNotificationLogDocument,
} from './schemas/blog-notification-log.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogNotificationLogService extends BaseService<BlogNotificationLogDocument> {
  constructor(
    @InjectModel(BlogNotificationLog.name)
    private readonly mainModel: Model<BlogNotificationLogDocument>,
  ) {
    super(mainModel);
  }
}
