import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  Resolver,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  DistrictMessagePattern,
  CommonMicroserviceConfig,
  CityMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateDistrictInput,
  UpdateDistrictInput,
  DistrictQueryInput,
} from '../inputs';
import { DistrictTypedef, DistrictListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../district.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => DistrictTypedef)
export class DistrictResolver extends BaseResolver<
  CreateDistrictInput,
  UpdateDistrictInput,
  DistrictQueryInput
>({
  viewDto: DistrictTypedef,
  createInput: CreateDistrictInput,
  updateInput: UpdateDistrictInput,
  listQueryInput: DistrictQueryInput,
  listViewDto: DistrictListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly districtMicroservice: ClientProxy,
  ) {
    super(districtMicroservice, DistrictMessagePattern);
  }

  @ResolveField()
  async city(@Parent() district: DistrictTypedef) {
    try {
      return await firstValueFrom(
        this.baseMicroservice.send(CityMessagePattern.GET, {
          id: district?.city,
        }),
      );
    } catch {
      return null;
    }
  }

  @ResolveField()
  async parent(@Parent() district: DistrictTypedef) {
    try {
      return await firstValueFrom(
        this.baseMicroservice.send(DistrictMessagePattern.GET, {
          id: district?.parent,
        }),
      );
    } catch {
      return null;
    }
  }
}
