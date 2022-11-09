import {
  JobhopFptoLadipageLog,
  JobhopFptoLadipageLogDocument,
} from './schemas/jobhop-fptoladipagelog.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopFptoLadipageLogService extends BaseService<JobhopFptoLadipageLogDocument> {
  constructor(
    @InjectModel(JobhopFptoLadipageLog.name)
    private readonly mainModel: Model<JobhopFptoLadipageLogDocument>,
  ) {
    super(mainModel);
  }
}
