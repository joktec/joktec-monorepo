import { Model } from 'mongoose';
import { OrganizationLicenseVerify, OrganizationLicenseVerifyDocument } from './schemas/organization-license-verify.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationLicenseVerifyService extends BaseService<OrganizationLicenseVerifyDocument> {
  constructor(
    @InjectModel(OrganizationLicenseVerify.name) private organizationLicenseVerifyModel: Model<OrganizationLicenseVerifyDocument>,
  ) {
    super(organizationLicenseVerifyModel)
  }
}
