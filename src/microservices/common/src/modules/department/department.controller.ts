import {
  BaseMicroserviceController,
  DepartmentMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { PLURAL_NAME } from './department.constants';

@Controller(PLURAL_NAME)
export class DepartmentController extends BaseMicroserviceController(
  DepartmentMessagePattern,
) {
  constructor(private readonly departmentService: DepartmentService) {
    super(departmentService);
  }
}
