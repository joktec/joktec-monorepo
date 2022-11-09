import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  ThumdownReason,
  ThumdownReasonDocument,
} from './schemas/thumdown-reason.schema';

export class ThumdownReasonService extends BaseService<ThumdownReasonDocument> {
  constructor(
    @InjectModel(ThumdownReason.name)
    private thumdownReasonModel: Model<ThumdownReasonDocument>,
  ) {
    super(thumdownReasonModel);
  }
}
