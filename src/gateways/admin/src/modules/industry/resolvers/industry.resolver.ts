import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  IndustryMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateIndustryInput,
  UpdateIndustryInput,
  IndustryQueryInput,
} from '../inputs';
import { IndustryTypedef, IndustryListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../industry.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => IndustryTypedef)
export class IndustryResolver extends BaseResolver<
  CreateIndustryInput,
  UpdateIndustryInput,
  IndustryQueryInput
>({
  viewDto: IndustryTypedef,
  createInput: CreateIndustryInput,
  updateInput: UpdateIndustryInput,
  listQueryInput: IndustryQueryInput,
  listViewDto: IndustryListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly industryMicroservice: ClientProxy,
  ) {
    super(industryMicroservice, IndustryMessagePattern);
  }
}
