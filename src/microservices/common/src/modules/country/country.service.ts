import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { CountryDocument } from './schemas/country.schema';
import { NAME } from './country.constants';

export class CountryService extends BaseService<CountryDocument> {
  constructor(
    @InjectModel(NAME) private countryModel: Model<CountryDocument>,
  ) {
    super(countryModel);
  }
}
