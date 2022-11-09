import {
  BaseController,
  CreateCityInput,
  CityDto,
  CityListResponseDto,
  CityMessagePattern,
  CommonMicroserviceConfig,
  CityQueryInput,
  UpdateCityInput,
} from '@baotg/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../city.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class CityController extends BaseController<
  CityDto,
  CreateCityInput,
  UpdateCityInput,
  CityQueryInput,
  CityListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, CityMessagePattern);
  }
}
