import { Model } from 'mongoose';
import { OrganizationPackageLog, OrganizationPackageLogDocument } from './schemas/organization-package-log.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationPackageLogService extends BaseService<OrganizationPackageLogDocument> {
  constructor(
    @InjectModel(OrganizationPackageLog.name) private organizationPackageLogModel: Model<OrganizationPackageLogDocument>,
  ) {
    super(organizationPackageLogModel)
  }
}
