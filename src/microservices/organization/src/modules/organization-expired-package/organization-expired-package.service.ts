import { Model } from 'mongoose';
import { OrganizationExpiredPackage, OrganizationExpiredPackageDocument } from './schemas/organization-expired-package.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationExpiredPackageService extends BaseService<OrganizationExpiredPackageDocument> {
  constructor(
    @InjectModel(OrganizationExpiredPackage.name) private organizationExpiredPackageModel: Model<OrganizationExpiredPackageDocument>,
  ) {
    super(organizationExpiredPackageModel)
  }
}
