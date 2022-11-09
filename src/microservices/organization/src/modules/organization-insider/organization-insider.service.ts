import { Model } from 'mongoose';
import { OrganizationInsider, OrganizationInsiderDocument } from './schemas/organization-insider.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationInsiderService extends BaseService<OrganizationInsiderDocument> {
  constructor(
    @InjectModel(OrganizationInsider.name) private organizationInsiderModel: Model<OrganizationInsiderDocument>,
  ) {
    super(organizationInsiderModel)
  }
}
