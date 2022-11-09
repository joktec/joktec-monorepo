import {
  BaseController,
  CreateBannerInput,
  BannerDto,
  BannerListResponseDto,
  BannerMessagePattern,
  CommonMicroserviceConfig,
  BannerQueryInput,
  UpdateBannerInput,
} from '@baotg/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../banner.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class BannerController extends BaseController<
  BannerDto,
  CreateBannerInput,
  UpdateBannerInput,
  BannerQueryInput,
  BannerListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, BannerMessagePattern);
  }
}
