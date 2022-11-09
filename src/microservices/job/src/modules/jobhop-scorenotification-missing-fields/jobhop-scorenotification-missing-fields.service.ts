import {
  JobhopScoreNotificationMissingFields,
  JobhopScoreNotificationMissingFieldsDocument,
} from './schemas/jobhop-scorenotification-missing-fields.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopScoreNotificationMissingFieldsService extends BaseService<JobhopScoreNotificationMissingFieldsDocument> {
  constructor(
    @InjectModel(JobhopScoreNotificationMissingFields.name)
    private readonly mainModel: Model<JobhopScoreNotificationMissingFieldsDocument>,
  ) {
    super(mainModel);
  }
}
