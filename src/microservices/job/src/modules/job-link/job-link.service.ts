import { JobLink, JobLinkDocument } from './schemas/job-link.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobLinkService extends BaseService<JobLinkDocument> {
  constructor(
    @InjectModel(JobLink.name)
    private readonly mainModel: Model<JobLinkDocument>,
  ) {
    super(mainModel);
  }
}
