import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  SourceMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateSourceInput,
  UpdateSourceInput,
  SourceQueryInput,
} from '../inputs';
import { SourceTypedef, SourceListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../source.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => SourceTypedef)
export class SourceResolver extends BaseResolver<
  CreateSourceInput,
  UpdateSourceInput,
  SourceQueryInput
>({
  viewDto: SourceTypedef,
  createInput: CreateSourceInput,
  updateInput: UpdateSourceInput,
  listQueryInput: SourceQueryInput,
  listViewDto: SourceListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly sourceMicroservice: ClientProxy,
  ) {
    super(sourceMicroservice, SourceMessagePattern);
  }
}
