import {
  JobTemplates,
  JobTemplatesDocument,
} from './schemas/job-templates.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobTemplatesService extends BaseService<JobTemplatesDocument> {
  constructor(
    @InjectModel(JobTemplates.name)
    private readonly mainModel: Model<JobTemplatesDocument>,
  ) {
    super(mainModel);
  }
}
