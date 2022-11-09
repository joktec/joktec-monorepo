import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BannerMessagePattern,
  CommonMicroserviceConfig,
} from '@baotg/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateBannerInput,
  UpdateBannerInput,
  BannerQueryInput,
} from '../inputs';
import { BannerTypedef, BannerListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../banner.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => BannerTypedef)
export class BannerResolver extends BaseResolver<
  CreateBannerInput,
  UpdateBannerInput,
  BannerQueryInput
>({
  viewDto: BannerTypedef,
  createInput: CreateBannerInput,
  updateInput: UpdateBannerInput,
  listQueryInput: BannerQueryInput,
  listViewDto: BannerListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly bannerMicroservice: ClientProxy,
  ) {
    super(bannerMicroservice, BannerMessagePattern);
  }
}
