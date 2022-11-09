import {
  JobhopScoreNotificationMissingField,
  JobhopScoreNotificationMissingFieldDocument,
} from './schemas/jobhop-scorenotificationmissingfield.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopScoreNotificationMissingFieldService extends BaseService<JobhopScoreNotificationMissingFieldDocument> {
  constructor(
    @InjectModel(JobhopScoreNotificationMissingField.name)
    private readonly mainModel: Model<JobhopScoreNotificationMissingFieldDocument>,
  ) {
    super(mainModel);
  }
}
