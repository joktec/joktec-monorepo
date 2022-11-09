import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { JobAiLysis, JobAiLysisDocument } from './schemas/job-ai-lysis.schema';
import { Model } from 'mongoose';
@Injectable()
export class JobAiLysisService extends BaseService<JobAiLysisDocument> {
  constructor(
    @InjectModel(JobAiLysis.name)
    private readonly mainModel: Model<JobAiLysisDocument>,
  ) {
    super(mainModel);
  }
}
