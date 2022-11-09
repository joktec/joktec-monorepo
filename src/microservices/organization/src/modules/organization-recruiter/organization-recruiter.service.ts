import { Model } from 'mongoose';
import { OrganizationRecruiter, OrganizationRecruiterDocument } from './schemas/organization-recruiter.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationRecruiterService extends BaseService<OrganizationRecruiterDocument> {
  constructor(
    @InjectModel(OrganizationRecruiter.name) private organizationRecruiterModel: Model<OrganizationRecruiterDocument>,
  ) {
    super(organizationRecruiterModel)
  }
}
