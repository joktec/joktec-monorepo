import { JobVersion, JobVersionDocument } from './schemas/job-version.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobVersionService extends BaseService<JobVersionDocument> {
  constructor(
    @InjectModel(JobVersion.name)
    private readonly mainModel: Model<JobVersionDocument>,
  ) {
    super(mainModel);
  }
}
