import {
  BaseController,
  CreateSettingInput,
  SettingDto,
  SettingListResponseDto,
  SettingMessagePattern,
  CommonMicroserviceConfig,
  SettingQueryInput,
  UpdateSettingInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../setting.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class SettingController extends BaseController<
  SettingDto,
  CreateSettingInput,
  UpdateSettingInput,
  SettingQueryInput,
  SettingListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, SettingMessagePattern);
  }
}
