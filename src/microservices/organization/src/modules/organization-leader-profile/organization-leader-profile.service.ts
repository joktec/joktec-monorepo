import { Model } from 'mongoose';
import { OrganizationLeaderProfile, OrganizationLeaderProfileDocument } from './schemas/organization-leader-profile.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationLeaderProfileService extends BaseService<OrganizationLeaderProfileDocument> {
  constructor(
    @InjectModel(OrganizationLeaderProfile.name) private organizationLeaderProfileModel: Model<OrganizationLeaderProfileDocument>,
  ) {
    super(organizationLeaderProfileModel)
  }
}
