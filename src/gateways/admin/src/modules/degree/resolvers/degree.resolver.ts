import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  DegreeMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateDegreeInput,
  UpdateDegreeInput,
  DegreeQueryInput,
} from '../inputs';
import { DegreeTypedef, DegreeListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../degree.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => DegreeTypedef)
export class DegreeResolver extends BaseResolver<
  CreateDegreeInput,
  UpdateDegreeInput,
  DegreeQueryInput
>({
  viewDto: DegreeTypedef,
  createInput: CreateDegreeInput,
  updateInput: UpdateDegreeInput,
  listQueryInput: DegreeQueryInput,
  listViewDto: DegreeListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly degreeMicroservice: ClientProxy,
  ) {
    super(degreeMicroservice, DegreeMessagePattern);
  }
}
