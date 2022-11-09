import {
  BaseDataLoader,
  DepartmentMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
export class DepartmentDataloader extends BaseDataLoader {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice, DepartmentMessagePattern);
  }
}
