import {
  BaseController,
  CreateIndustryInput,
  IndustryDto,
  IndustryListResponseDto,
  IndustryMessagePattern,
  CommonMicroserviceConfig,
  IndustryQueryInput,
  UpdateIndustryInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../industry.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class IndustryController extends BaseController<
  IndustryDto,
  CreateIndustryInput,
  UpdateIndustryInput,
  IndustryQueryInput,
  IndustryListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, IndustryMessagePattern);
  }
}
