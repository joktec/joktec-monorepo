import { Model } from 'mongoose';
import { OrganizationReviewDetail, OrganizationReviewDetailDocument } from './schemas/organization-review-detail.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationReviewDetailService extends BaseService<OrganizationReviewDetailDocument> {
  constructor(
    @InjectModel(OrganizationReviewDetail.name) private organizationReviewDetailModel: Model<OrganizationReviewDetailDocument>,
  ) {
    super(organizationReviewDetailModel)
  }
}
