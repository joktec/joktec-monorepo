import {
  JobSearchQuota,
  JobSearchQuotaDocument,
} from './schemas/job-search-quota.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobSearchQuotaService extends BaseService<JobSearchQuotaDocument> {
  constructor(
    @InjectModel(JobSearchQuota.name)
    private readonly mainModel: Model<JobSearchQuotaDocument>,
  ) {
    super(mainModel);
  }
}
