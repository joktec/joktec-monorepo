import { Model } from 'mongoose';
import { OrganizationFirstJob, OrganizationFirstJobDocument } from './schemas/organization-first-job.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationFirstJobService extends BaseService<OrganizationFirstJobDocument> {
  constructor(
    @InjectModel(OrganizationFirstJob.name) private organizationFirstJobModel: Model<OrganizationFirstJobDocument>,
  ) {
    super(organizationFirstJobModel)
  }
}
