import {
  JobhopJobSetting,
  JobhopJobSettingDocument,
} from './schemas/jobhop-jobsetting.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopJobSettingService extends BaseService<JobhopJobSettingDocument> {
  constructor(
    @InjectModel(JobhopJobSetting.name)
    private readonly mainModel: Model<JobhopJobSettingDocument>,
  ) {
    super(mainModel);
  }
}
