import { JobTitle, JobTitleDocument } from './schemas/job-title.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobTitleService extends BaseService<JobTitleDocument> {
  constructor(
    @InjectModel(JobTitle.name)
    private readonly mainModel: Model<JobTitleDocument>,
  ) {
    super(mainModel);
  }
}
