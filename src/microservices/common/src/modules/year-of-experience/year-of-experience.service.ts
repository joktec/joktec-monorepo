import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  YearOfExperience,
  YearOfExperienceDocument,
} from './schemas/year-of-experience.schema';

export class YearOfExperienceService extends BaseService<YearOfExperienceDocument> {
  constructor(
    @InjectModel(YearOfExperience.name)
    private yearOfExperienceModel: Model<YearOfExperienceDocument>,
  ) {
    super(yearOfExperienceModel);
  }
}
