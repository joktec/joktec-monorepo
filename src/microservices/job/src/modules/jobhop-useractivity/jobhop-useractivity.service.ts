import {
  JobhopUserActivity,
  JobhopUserActivityDocument,
} from './schemas/jobhop-useractivity.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopUserActivityService extends BaseService<JobhopUserActivityDocument> {
  constructor(
    @InjectModel(JobhopUserActivity.name)
    private readonly mainModel: Model<JobhopUserActivityDocument>,
  ) {
    super(mainModel);
  }
}
