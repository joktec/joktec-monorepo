import {
  BaseMicroserviceController,
  CandidateCompanyTypeMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateCompanyTypeService } from './candidate-company-type.service';

@Controller('candidate-company-type')
export class CandidateCompanyTypeController extends BaseMicroserviceController(
  CandidateCompanyTypeMessagePattern,
) {
  constructor(
    private readonly candidateCompanyTypeService: CandidateCompanyTypeService,
  ) {
    super(candidateCompanyTypeService);
  }
}
