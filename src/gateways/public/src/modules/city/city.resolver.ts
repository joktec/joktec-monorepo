import { CityEnum } from '@app/constants';
import {
  CommonMicroserviceConfig,
  LocationMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateCityInput,
  City,
  CityListResponse,
  CityQueryInput,
  UpdateCityInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => City)
export class CityResolver extends BaseResolver<
  CreateCityInput,
  UpdateCityInput,
  CityQueryInput
>({
  viewDto: City,
  createInput: CreateCityInput,
  updateInput: UpdateCityInput,
  listQueryInput: CityQueryInput,
  listViewDto: CityListResponse,
  name: CityEnum.NAME,
  pluralName: CityEnum.PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice, LocationMessagePattern);
  }

  @ResolveField()
  async localizedName(@Parent() parent) {
    try {
      return { vi: parent.name, en: parent.nameEn };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
