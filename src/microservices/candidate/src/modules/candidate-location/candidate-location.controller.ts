import {
  BaseMicroserviceController,
  CandidateLocationMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateLocationService } from './candidate-location.service';

@Controller('candidate-location')
export class CandidateLocationController extends BaseMicroserviceController(
  CandidateLocationMessagePattern,
) {
  constructor(
    private readonly candidateLocationService: CandidateLocationService,
  ) {
    super(candidateLocationService);
  }
}
