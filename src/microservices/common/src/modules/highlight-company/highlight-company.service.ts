import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  HighlightCompany,
  HighlightCompanyDocument,
} from './schemas/highlight-company.schema';
export class HighlightCompanyService extends BaseService<HighlightCompanyDocument> {
  constructor(
    @InjectModel(HighlightCompany.name)
    private highlightModel: Model<HighlightCompanyDocument>,
  ) {
    super(highlightModel);
  }
}
