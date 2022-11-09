import { Controller } from '@nestjs/common';
import { CandidateThumbdownCountService } from './candidate-thumbdown-count.service';
import {
  BaseMicroserviceController,
  CandidateThumbdownCountMessagePattern,
} from '@jobhopin/core';

@Controller('candidate-thumbdown-count')
export class CandidateThumbdownCountController extends BaseMicroserviceController(
  CandidateThumbdownCountMessagePattern,
) {
  constructor(
    private readonly candidateThumbdownCountService: CandidateThumbdownCountService,
  ) {
    super(candidateThumbdownCountService);
  }
}
