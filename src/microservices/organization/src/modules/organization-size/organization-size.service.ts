import { Model } from 'mongoose';
import { OrganizationSize, OrganizationSizeDocument } from './schemas/organization-size.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class OrganizationSizeService extends BaseService<OrganizationSizeDocument> {
  constructor(
    @InjectModel(OrganizationSize.name) private organizationSizeModel: Model<OrganizationSizeDocument>,
  ) {
    super(organizationSizeModel)
  }
}
