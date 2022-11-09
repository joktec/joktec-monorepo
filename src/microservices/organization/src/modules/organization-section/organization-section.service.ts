import { Model } from 'mongoose';
import { OrganizationSection, OrganizationSectionDocument } from './schemas/organization-section.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationSectionService extends BaseService<OrganizationSectionDocument> {
  constructor(
    @InjectModel(OrganizationSection.name) private organizationSectionModel: Model<OrganizationSectionDocument>,
  ) {
    super(organizationSectionModel)
  }
}
