import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';

@Injectable()
export class JobService extends BaseService<JobDocument> {
  constructor(
    @InjectModel(Job.name) private readonly mainModel: Model<JobDocument>,
  ) {
    super(mainModel);
  }
}
