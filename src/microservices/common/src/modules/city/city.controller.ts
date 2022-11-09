import { BaseMicroserviceController, CityMessagePattern } from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CityService } from './city.service';
import { PLURAL_NAME } from './city.constants';

@Controller(PLURAL_NAME)
export class CityController extends BaseMicroserviceController(
  CityMessagePattern,
) {
  constructor(private readonly cityService: CityService) {
    super(cityService);
  }
}
