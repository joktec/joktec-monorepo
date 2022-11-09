import {
  BaseController,
  CreatePlatformInput,
  PlatformDto,
  PlatformListResponseDto,
  PlatformMessagePattern,
  CommonMicroserviceConfig,
  PlatformQueryInput,
  UpdatePlatformInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../platform.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class PlatformController extends BaseController<
  PlatformDto,
  CreatePlatformInput,
  UpdatePlatformInput,
  PlatformQueryInput,
  PlatformListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, PlatformMessagePattern);
  }
}
