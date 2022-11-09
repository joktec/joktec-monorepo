import {
  JobhopSuggestedKeyword,
  JobhopSuggestedKeywordDocument,
} from './schemas/jobhop-suggestedkeyword.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopSuggestedKeywordService extends BaseService<JobhopSuggestedKeywordDocument> {
  constructor(
    @InjectModel(JobhopSuggestedKeyword.name)
    private readonly mainModel: Model<JobhopSuggestedKeywordDocument>,
  ) {
    super(mainModel);
  }
}
