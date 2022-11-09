import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  JobhopUserScoreNotification,
  JobhopUserScoreNotificationDocument,
} from './schemas/jobhop-userscorenotification.schema';

@Injectable()
export class JobhopUserScoreNotificationService extends BaseService<JobhopUserScoreNotificationDocument> {
  constructor(
    @InjectModel(JobhopUserScoreNotification.name)
    private readonly mainModel: Model<JobhopUserScoreNotificationDocument>,
  ) {
    super(mainModel);
  }
}
