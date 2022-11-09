import {
  BaseDataLoader,
  OrganizationMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const orgMicroserviceConfig = new OrganizationMicroserviceConfig();
export class OrganizationDataloader extends BaseDataLoader {
  constructor(
    @Inject(orgMicroserviceConfig.name)
    private readonly orgMicroservice: ClientProxy,
  ) {
    super(orgMicroservice, OrganizationMessagePattern);
  }
}
