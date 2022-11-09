import {
  JobhopUserScoreSentNotification,
  JobhopUserScoreSentNotificationDocument,
} from './schemas/jobhop-userscoresentnotification.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopUserScoreSentNotificationService extends BaseService<JobhopUserScoreSentNotificationDocument> {
  constructor(
    @InjectModel(JobhopUserScoreSentNotification.name)
    private readonly mainModel: Model<JobhopUserScoreSentNotificationDocument>,
  ) {
    super(mainModel);
  }
}
