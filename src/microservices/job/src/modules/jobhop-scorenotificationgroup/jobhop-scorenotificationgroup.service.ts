import {
  JobhopScoreNotificationGroup,
  JobhopScoreNotificationGroupDocument,
} from './schemas/jobhop-scorenotificationgroup.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopScoreNotificationGroupService extends BaseService<JobhopScoreNotificationGroupDocument> {
  constructor(
    @InjectModel(JobhopScoreNotificationGroup.name)
    private readonly mainModel: Model<JobhopScoreNotificationGroupDocument>,
  ) {
    super(mainModel);
  }
}
