// import { LocationEnum } from '@app/constants';
import { LocationEnum } from '@app/constants';
import { UNUSED_DISTRICTS } from '@app/constants/location';
import {
  CommonMicroserviceConfig,
  LocationMessagePattern,
  LocationTypeMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateLocationInput,
  Location,
  LocationListResponse,
  LocationQueryInput,
  UpdateLocationInput,
} from '@jobhopin/graphql';

import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => Location)
export class LocationResolver extends BaseResolver<
  CreateLocationInput,
  UpdateLocationInput,
  LocationQueryInput
>({
  viewDto: Location,
  createInput: CreateLocationInput,
  updateInput: UpdateLocationInput,
  listQueryInput: LocationQueryInput,
  listViewDto: LocationListResponse,
  name: LocationEnum.NAME,
  pluralName: LocationEnum.PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice, LocationMessagePattern);
  }

  @Query(() => LocationListResponse, {
    name: LocationEnum.PLURAL_NAME,
  })
  async findAll(
    @Args('query', {
      type: () => LocationQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: LocationQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(LocationMessagePattern.LIST, query),
      );
      const locationType = await firstValueFrom(
        this.commonMicroservice.send(LocationTypeMessagePattern.GET, {
          id: items[0]?.locationTypeId,
        }),
      );

      if (items.length == 0) return { items: [] };

      const locations = items
        .filter((item) => !UNUSED_DISTRICTS.includes(item.slug))
        .map((item) => ({
          ...item,
          id: item.sqlId,
          value: item.sqlId,
          type: item.locationType,
          level: locationType?.level,
          localizedName: {
            vi: item.name,
            en: item.nameEn,
          },
        }));

      return { items: locations };
    } catch (error) {
      throw new Error(error.message);
    }
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
