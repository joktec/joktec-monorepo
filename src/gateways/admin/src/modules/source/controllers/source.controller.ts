import {
  BaseController,
  CreateSourceInput,
  SourceDto,
  SourceListResponseDto,
  SourceMessagePattern,
  CommonMicroserviceConfig,
  SourceQueryInput,
  UpdateSourceInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../source.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class SourceController extends BaseController<
  SourceDto,
  CreateSourceInput,
  UpdateSourceInput,
  SourceQueryInput,
  SourceListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, SourceMessagePattern);
  }
}
