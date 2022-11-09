import {
  BaseController,
  CreateUniversityInput,
  UniversityDto,
  UniversityListResponseDto,
  UniversityMessagePattern,
  CommonMicroserviceConfig,
  UniversityQueryInput,
  UpdateUniversityInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../university.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class UniversityController extends BaseController<
  UniversityDto,
  CreateUniversityInput,
  UpdateUniversityInput,
  UniversityQueryInput,
  UniversityListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, UniversityMessagePattern);
  }
}
