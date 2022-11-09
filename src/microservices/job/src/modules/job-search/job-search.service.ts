import { JobSearch, JobSearchDocument } from './schemas/job-search.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobSearchService extends BaseService<JobSearchDocument> {
  constructor(
    @InjectModel(JobSearch.name)
    private readonly mainModel: Model<JobSearchDocument>,
  ) {
    super(mainModel);
  }
}
