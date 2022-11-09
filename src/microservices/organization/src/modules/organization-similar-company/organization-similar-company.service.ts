import { Model } from 'mongoose';
import { OrganizationSimilarCompany, OrganizationSimilarCompanyDocument } from './schemas/organization-similar-company.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationSimilarCompanyService extends BaseService<OrganizationSimilarCompanyDocument> {
  constructor(
    @InjectModel(OrganizationSimilarCompany.name) private organizationSimilarCompanyModel: Model<OrganizationSimilarCompanyDocument>,
  ) {
    super(organizationSimilarCompanyModel)
  }
}
