import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  CountryMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateCountryInput,
  UpdateCountryInput,
  CountryQueryInput,
} from '../inputs';
import { CountryTypedef, CountryListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../country.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => CountryTypedef)
export class CountryResolver extends BaseResolver<
  CreateCountryInput,
  UpdateCountryInput,
  CountryQueryInput
>({
  viewDto: CountryTypedef,
  createInput: CreateCountryInput,
  updateInput: UpdateCountryInput,
  listQueryInput: CountryQueryInput,
  listViewDto: CountryListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly countryMicroservice: ClientProxy,
  ) {
    super(countryMicroservice, CountryMessagePattern);
  }
}
