import {
  JobhopOrganizationBenefit,
  JobhopOrganizationBenefitDocument,
} from './schemas/jobhop-organizationbenefit.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopOrganizationBenefitService extends BaseService<JobhopOrganizationBenefitDocument> {
  constructor(
    @InjectModel(JobhopOrganizationBenefit.name)
    private readonly mainModel: Model<JobhopOrganizationBenefitDocument>,
  ) {
    super(mainModel);
  }
}
