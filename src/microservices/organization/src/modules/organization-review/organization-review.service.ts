import { Model } from 'mongoose';
import { OrganizationReview, OrganizationReviewDocument } from './schemas/organization-review.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationReviewService extends BaseService<OrganizationReviewDocument> {
  constructor(
    @InjectModel(OrganizationReview.name) private organizationReviewModel: Model<OrganizationReviewDocument>,
  ) {
    super(organizationReviewModel)
  }
}
