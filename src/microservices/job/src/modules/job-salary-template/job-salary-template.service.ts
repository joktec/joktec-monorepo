import {
  JobSalaryTemplate,
  JobSalaryTemplateDocument,
} from './schemas/job-salary-template.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobSalaryTemplateService extends BaseService<JobSalaryTemplateDocument> {
  constructor(
    @InjectModel(JobSalaryTemplate.name)
    private readonly mainModel: Model<JobSalaryTemplateDocument>,
  ) {
    super(mainModel);
  }
}
