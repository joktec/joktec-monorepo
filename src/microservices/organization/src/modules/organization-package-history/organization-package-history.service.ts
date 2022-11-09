import { Model } from 'mongoose';
import { OrganizationPackageHistory, OrganizationPackageHistoryDocument } from './schemas/organization-package-history.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationPackageHistoryService extends BaseService<OrganizationPackageHistoryDocument> {
  constructor(
    @InjectModel(OrganizationPackageHistory.name) private organizationPackageHistoryModel: Model<OrganizationPackageHistoryDocument>,
  ) {
    super(organizationPackageHistoryModel)
  }
}
