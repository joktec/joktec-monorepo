import {
  JobhopEmailHistory,
  JobhopEmailHistoryDocument,
} from './schemas/jobhop-emailhistory.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopEmailHistoryService extends BaseService<JobhopEmailHistoryDocument> {
  constructor(
    @InjectModel(JobhopEmailHistory.name)
    private readonly mainModel: Model<JobhopEmailHistoryDocument>,
  ) {
    super(mainModel);
  }
}
