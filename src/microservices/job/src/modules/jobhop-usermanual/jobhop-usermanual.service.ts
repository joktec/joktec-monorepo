import {
  JobhopUserManual,
  JobhopUserManualDocument,
} from './schemas/jobhop-usermanual.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopUserManualService extends BaseService<JobhopUserManualDocument> {
  constructor(
    @InjectModel(JobhopUserManual.name)
    private readonly mainModel: Model<JobhopUserManualDocument>,
  ) {
    super(mainModel);
  }
}
