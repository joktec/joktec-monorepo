import {
  BaseController,
  CreateCountryInput,
  CountryDto,
  CountryListResponseDto,
  CountryMessagePattern,
  CommonMicroserviceConfig,
  CountryQueryInput,
  UpdateCountryInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../country.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class CountryController extends BaseController<
  CountryDto,
  CreateCountryInput,
  UpdateCountryInput,
  CountryQueryInput,
  CountryListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, CountryMessagePattern);
  }
}
