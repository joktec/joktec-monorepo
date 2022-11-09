import { InjectModel } from '@nestjs/mongoose';
import {
  JobBoardApplyLog,
  JobBoardApplyLogDocument,
} from './schemas/job-board-apply-log.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class JobBoardApplyLogService extends BaseService<JobBoardApplyLogDocument> {
  constructor(
    @InjectModel(JobBoardApplyLog.name)
    private readonly mainModel: Model<JobBoardApplyLogDocument>,
  ) {
    super(mainModel);
  }
}
