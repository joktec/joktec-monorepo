import {
  BaseMicroserviceController,
  SalaryMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController extends BaseMicroserviceController(
  SalaryMessagePattern,
) {
  constructor(private readonly salaryService: SalaryService) {
    super(salaryService);
  }
}
