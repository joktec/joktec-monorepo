import { Model } from 'mongoose';
import { OrganizationMedia, OrganizationMediaDocument } from './schemas/organization-media.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationMediaService extends BaseService<OrganizationMediaDocument> {
  constructor(
    @InjectModel(OrganizationMedia.name) private organizationMediaModel: Model<OrganizationMediaDocument>,
  ) {
    super(organizationMediaModel)
  }
}
