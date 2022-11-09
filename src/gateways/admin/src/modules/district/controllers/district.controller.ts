import {
  BaseController,
  CreateDistrictInput,
  DistrictDto,
  DistrictListResponseDto,
  DistrictMessagePattern,
  CommonMicroserviceConfig,
  DistrictQueryInput,
  UpdateDistrictInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../district.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class DistrictController extends BaseController<
  DistrictDto,
  CreateDistrictInput,
  UpdateDistrictInput,
  DistrictQueryInput,
  DistrictListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, DistrictMessagePattern);
  }
}
