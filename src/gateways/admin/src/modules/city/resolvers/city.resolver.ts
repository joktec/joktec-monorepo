import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  Resolver,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  CityMessagePattern,
  CommonMicroserviceConfig,
  CountryMessagePattern,
} from '@baotg/core';
import {
  BaseResolver,
} from '@baotg/graphql';

import {
  CreateCityInput,
  UpdateCityInput,
  CityQueryInput,
} from '../inputs';
import { CityTypedef, CityListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../city.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => CityTypedef)
export class CityResolver extends BaseResolver<
  CreateCityInput,
  UpdateCityInput,
  CityQueryInput
>({
  viewDto: CityTypedef,
  createInput: CreateCityInput,
  updateInput: UpdateCityInput,
  listQueryInput: CityQueryInput,
  listViewDto: CityListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly cityMicroservice: ClientProxy,
  ) {
    super(cityMicroservice, CityMessagePattern);
  }
  @ResolveField()
  async country(@Parent() city: CityTypedef) {
    try {
      return await firstValueFrom(
        this.baseMicroservice.send(CountryMessagePattern.GET, {
          id: city.country,
        }),
      );
    } catch {
      return null;
    }
  }
}
