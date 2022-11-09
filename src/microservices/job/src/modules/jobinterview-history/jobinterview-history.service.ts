import {
  JobInterviewHistory,
  JobInterviewHistoryDocument,
} from './schemas/jobinterview-history.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobInterviewHistoryService extends BaseService<JobInterviewHistoryDocument> {
  constructor(
    @InjectModel(JobInterviewHistory.name)
    private readonly mainModel: Model<JobInterviewHistoryDocument>,
  ) {
    super(mainModel);
  }
}
