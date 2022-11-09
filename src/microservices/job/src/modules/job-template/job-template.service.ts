import {
  JobTemplate,
  JobTemplateDocument,
} from './schemas/job-template.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobTemplateService extends BaseService<JobTemplateDocument> {
  constructor(
    @InjectModel(JobTemplate.name)
    private readonly mainModel: Model<JobTemplateDocument>,
  ) {
    super(mainModel);
  }
}
