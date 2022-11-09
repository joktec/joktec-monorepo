import { Model } from 'mongoose';
import {
  Organization,
  OrganizationDocument,
} from './schemas/organization.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class OrganizationService extends BaseService<OrganizationDocument> {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {
    super(organizationModel);
  }

  async findOneBy(query) {
    return await this.organizationModel.find(query).exec();
  }
}
