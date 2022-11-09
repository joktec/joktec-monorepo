import { JobType, JobTypeDocument } from './schemas/job-type.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobTypeService extends BaseService<JobTypeDocument> {
  constructor(
    @InjectModel(JobType.name)
    private readonly mainModel: Model<JobTypeDocument>,
  ) {
    super(mainModel);
  }
}
