import { Model } from 'mongoose';
import { OrganizationCustomUrl, OrganizationCustomUrlDocument } from './schemas/organization-custom-url.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationCustomUrlService extends BaseService<OrganizationCustomUrlDocument> {
  constructor(
    @InjectModel(OrganizationCustomUrl.name) private organizationCustomUrlModel: Model<OrganizationCustomUrlDocument>,
  ) {
    super(organizationCustomUrlModel)
  }
}
