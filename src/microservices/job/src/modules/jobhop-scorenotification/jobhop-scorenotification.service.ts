import {
  JobhopScoreNotification,
  JobhopScoreNotificationDocument,
} from './schemas/jobhop-scorenotification.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopScoreNotificationService extends BaseService<JobhopScoreNotificationDocument> {
  constructor(
    @InjectModel(JobhopScoreNotification.name)
    private readonly mainModel: Model<JobhopScoreNotificationDocument>,
  ) {
    super(mainModel);
  }
}
