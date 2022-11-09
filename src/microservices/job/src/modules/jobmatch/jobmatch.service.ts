import { JobMatch, JobMatchDocument } from './schemas/jobmatch.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobMatchService extends BaseService<JobMatchDocument> {
  constructor(
    @InjectModel(JobMatch.name)
    private readonly mainModel: Model<JobMatchDocument>,
  ) {
    super(mainModel);
  }
}
