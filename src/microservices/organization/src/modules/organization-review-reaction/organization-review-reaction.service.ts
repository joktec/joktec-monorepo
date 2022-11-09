import { Model } from 'mongoose';
import { OrganizationReviewReaction, OrganizationReviewReactionDocument } from './schemas/organization-review-reaction.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationReviewReactionService extends BaseService<OrganizationReviewReactionDocument> {
  constructor(
    @InjectModel(OrganizationReviewReaction.name) private organizationReviewReactionModel: Model<OrganizationReviewReactionDocument>,
  ) {
    super(organizationReviewReactionModel)
  }
}
