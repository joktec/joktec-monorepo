import { Controller } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import {
  BaseMicroserviceController,
  CandidateMessagePattern,
} from '@jobhopin/core';

@Controller('candidate')
export class CandidateController extends BaseMicroserviceController(
  CandidateMessagePattern,
) {
  constructor(private readonly candidateService: CandidateService) {
    super(candidateService);
  }
}
