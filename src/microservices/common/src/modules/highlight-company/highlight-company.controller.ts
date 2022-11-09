import {
  BaseMicroserviceController,
  HighlightCompanyMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { HighlightCompanyService } from './highlight-company.service';

@Controller('level')
export class HighlightCompanyController extends BaseMicroserviceController(
  HighlightCompanyMessagePattern,
) {
  constructor(private readonly levelService: HighlightCompanyService) {
    super(levelService);
  }
}
