import { Model } from 'mongoose';
import { OrganizationPlatform, OrganizationPlatformDocument } from './schemas/organization-platform.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationPlatformService extends BaseService<OrganizationPlatformDocument> {
  constructor(
    @InjectModel(OrganizationPlatform.name) private organizationPlatformModel: Model<OrganizationPlatformDocument>,
  ) {
    super(organizationPlatformModel)
  }
}
