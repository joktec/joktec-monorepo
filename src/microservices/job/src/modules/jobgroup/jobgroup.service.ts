import { JobGroup, JobGroupDocument } from './schemas/jobgroup.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobGroupService extends BaseService<JobGroupDocument> {
  constructor(
    @InjectModel(JobGroup.name)
    private readonly mainModel: Model<JobGroupDocument>,
  ) {
    super(mainModel);
  }
}
