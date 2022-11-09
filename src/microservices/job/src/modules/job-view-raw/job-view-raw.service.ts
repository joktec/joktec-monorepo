import { JobViewRaw, JobViewRawDocument } from './schemas/job-view-raw.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobViewRawService extends BaseService<JobViewRawDocument> {
  constructor(
    @InjectModel(JobViewRaw.name)
    private readonly mainModel: Model<JobViewRawDocument>,
  ) {
    super(mainModel);
  }
}
