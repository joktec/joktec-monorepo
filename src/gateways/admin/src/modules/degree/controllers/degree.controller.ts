import {
  BaseController,
  CreateDegreeInput,
  DegreeDto,
  DegreeListResponseDto,
  DegreeMessagePattern,
  CommonMicroserviceConfig,
  DegreeQueryInput,
  UpdateDegreeInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../degree.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class DegreeController extends BaseController<
  DegreeDto,
  CreateDegreeInput,
  UpdateDegreeInput,
  DegreeQueryInput,
  DegreeListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, DegreeMessagePattern);
  }
}
