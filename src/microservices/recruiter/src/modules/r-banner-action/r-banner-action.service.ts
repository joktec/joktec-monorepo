import {
  BaseService,
  RBannerConditionInput,
  RBannerPaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RBannerAction,
  RBannerActionDocument,
} from './schemas/r-banner-action.schema';

@Injectable()
export class RBannerActionService extends BaseService<
  RBannerActionDocument,
  RBannerConditionInput,
  RBannerPaginationInput
> {
  constructor(
    @InjectModel(RBannerAction.name)
    private rBannerActionModel: Model<RBannerActionDocument>,
  ) {
    super(rBannerActionModel);
  }
}
