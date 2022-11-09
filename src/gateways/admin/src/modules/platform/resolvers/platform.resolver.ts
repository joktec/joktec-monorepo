import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  PlatformMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreatePlatformInput,
  UpdatePlatformInput,
  PlatformQueryInput,
} from '../inputs';
import { PlatformTypedef, PlatformListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../platform.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => PlatformTypedef)
export class PlatformResolver extends BaseResolver<
  CreatePlatformInput,
  UpdatePlatformInput,
  PlatformQueryInput
>({
  viewDto: PlatformTypedef,
  createInput: CreatePlatformInput,
  updateInput: UpdatePlatformInput,
  listQueryInput: PlatformQueryInput,
  listViewDto: PlatformListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly platformMicroservice: ClientProxy,
  ) {
    super(platformMicroservice, PlatformMessagePattern);
  }
}
