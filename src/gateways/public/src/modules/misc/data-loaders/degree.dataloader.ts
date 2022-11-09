import {
  BaseDataLoader,
  DegreeMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
export class DegreeDataloader extends BaseDataLoader {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice, DegreeMessagePattern);
  }
}
