import { JobView, JobViewDocument } from './schemas/job-view.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobViewService extends BaseService<JobViewDocument> {
  constructor(
    @InjectModel(JobView.name)
    private readonly mainModel: Model<JobViewDocument>,
  ) {
    super(mainModel);
  }
}
