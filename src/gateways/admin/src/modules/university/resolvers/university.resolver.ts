import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  UniversityMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateUniversityInput,
  UpdateUniversityInput,
  UniversityQueryInput,
} from '../inputs';
import { UniversityTypedef, UniversityListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../university.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => UniversityTypedef)
export class UniversityResolver extends BaseResolver<
  CreateUniversityInput,
  UpdateUniversityInput,
  UniversityQueryInput
>({
  viewDto: UniversityTypedef,
  createInput: CreateUniversityInput,
  updateInput: UpdateUniversityInput,
  listQueryInput: UniversityQueryInput,
  listViewDto: UniversityListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly universityMicroservice: ClientProxy,
  ) {
    super(universityMicroservice, UniversityMessagePattern);
  }
}
