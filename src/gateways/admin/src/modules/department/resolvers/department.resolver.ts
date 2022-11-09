import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  DepartmentMessagePattern,
  CommonMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
} from '@jobhopin/graphql';

import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
  DepartmentQueryInput,
} from '../inputs';
import { DepartmentTypedef, DepartmentListResponseTypedef } from '../typedefs';
import { NAME, PLURAL_NAME } from '../department.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Resolver(() => DepartmentTypedef)
export class DepartmentResolver extends BaseResolver<
  CreateDepartmentInput,
  UpdateDepartmentInput,
  DepartmentQueryInput
>({
  viewDto: DepartmentTypedef,
  createInput: CreateDepartmentInput,
  updateInput: UpdateDepartmentInput,
  listQueryInput: DepartmentQueryInput,
  listViewDto: DepartmentListResponseTypedef,
  name: NAME,
  pluralName: PLURAL_NAME,
}) {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly departmentMicroservice: ClientProxy,
  ) {
    super(departmentMicroservice, DepartmentMessagePattern);
  }
}
