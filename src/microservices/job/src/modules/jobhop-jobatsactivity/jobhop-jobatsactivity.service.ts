import {
  JobhopJobAtsActivity,
  JobhopJobAtsActivityDocument,
} from './schemas/jobhop-jobatsactivity.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopJobAtsActivityService extends BaseService<JobhopJobAtsActivityDocument> {
  constructor(
    @InjectModel(JobhopJobAtsActivity.name)
    private readonly mainModel: Model<JobhopJobAtsActivityDocument>,
  ) {
    super(mainModel);
  }
}
