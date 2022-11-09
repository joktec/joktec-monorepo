import {
  BaseMicroserviceController,
  CandidateIndustryMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateIndustryService } from './candidate-industry.service';

@Controller('candidate-industry')
export class CandidateIndustryController extends BaseMicroserviceController(
  CandidateIndustryMessagePattern,
) {
  constructor(
    private readonly candidateIndustryService: CandidateIndustryService,
  ) {
    super(candidateIndustryService);
  }
}
