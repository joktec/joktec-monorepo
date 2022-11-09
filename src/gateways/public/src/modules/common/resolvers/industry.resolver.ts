import { IndustryEnum } from '@app/constants';
import {
  CommonMicroserviceConfig,
  IndustryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  Industry,
  IndustryListResponse,
  IndustryQueryInput,
  FptoTopIndustry
} from '@jobhopin/graphql';

import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => Industry)
export class IndustryResolver extends BaseResolver<
  null,
  null,
  IndustryQueryInput
>({
  viewDto: Industry,
  createInput: null,
  updateInput: null,
  listQueryInput: IndustryQueryInput,
  listViewDto: IndustryListResponse,
  name: IndustryEnum.INDUSTRY_NAME,
  pluralName: IndustryEnum.INDUSTRY_PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice, IndustryMessagePattern);
  }

  @Query(() => [FptoTopIndustry], { name: 'fptoTopIndustry' })
  async fptoTopIndustry() {
    try {
      return await firstValueFrom(
        this.commonMicroservice.send(IndustryMessagePattern.FPTO_TOP_INDUSTRY, {}),
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
