import {
  BaseMicroserviceController,
  CompanyTypeMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CompanyTypeService } from './company-type.service';

@Controller('company-types')
export class CompanyTypeController extends BaseMicroserviceController(
  CompanyTypeMessagePattern,
) {
  constructor(private readonly companyTypeService: CompanyTypeService) {
    super(companyTypeService);
  }
}
