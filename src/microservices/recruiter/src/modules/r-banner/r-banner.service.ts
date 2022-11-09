import { RBanner, RBannerDocument } from './schemas/r-banner.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BaseService,
  RBannerConditionInput,
  RBannerPaginationInput,
} from '@jobhopin/core';

@Injectable()
export class RBannerService extends BaseService<
  RBannerDocument,
  RBannerConditionInput,
  RBannerPaginationInput
> {
  constructor(
    @InjectModel(RBanner.name)
    private rBannerModel: Model<RBannerDocument>,
  ) {
    super(rBannerModel);
  }
}
