import {
  BaseMicroserviceController,
  CountryMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CountryService } from './country.service';
import { PLURAL_NAME } from './country.constants';

@Controller(PLURAL_NAME)
export class CountryController extends BaseMicroserviceController(
  CountryMessagePattern,
) {
  constructor(private readonly countryService: CountryService) {
    super(countryService);
  }
}
