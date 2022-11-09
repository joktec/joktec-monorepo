import {
  BaseMicroserviceController,
  CandidateLinkMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateLinkService } from './candidate-link.service';

@Controller('candidate-link')
export class CandidateLinkController extends BaseMicroserviceController(
  CandidateLinkMessagePattern,
) {
  constructor(private readonly candidateLinkService: CandidateLinkService) {
    super(candidateLinkService);
  }
}
