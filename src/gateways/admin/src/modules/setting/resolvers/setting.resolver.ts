import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  SettingMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateSettingInput,
  UpdateSettingInput,
  SettingQueryInput,
} from '../inputs';
import { SettingTypedef, SettingListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../setting.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => SettingTypedef)
export class SettingResolver extends BaseResolver<
  CreateSettingInput,
  UpdateSettingInput,
  SettingQueryInput
>({
  viewDto: SettingTypedef,
  createInput: CreateSettingInput,
  updateInput: UpdateSettingInput,
  listQueryInput: SettingQueryInput,
  listViewDto: SettingListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly settingMicroservice: ClientProxy,
  ) {
    super(settingMicroservice, SettingMessagePattern);
  }
}
