import {
  BaseController,
  CreateDepartmentInput,
  DepartmentDto,
  DepartmentListResponseDto,
  DepartmentMessagePattern,
  CommonMicroserviceConfig,
  DepartmentQueryInput,
  UpdateDepartmentInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PLURAL_NAME } from '../department.constants';

const commonMicroserviceConfig = new CommonMicroserviceConfig();

@Controller(PLURAL_NAME)
export class DepartmentController extends BaseController<
  DepartmentDto,
  CreateDepartmentInput,
  UpdateDepartmentInput,
  DepartmentQueryInput,
  DepartmentListResponseDto
> {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(commonMicroservice as any, DepartmentMessagePattern);
  }
}
