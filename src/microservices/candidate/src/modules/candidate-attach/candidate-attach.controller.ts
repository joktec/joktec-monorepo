import {
  BaseMicroserviceController,
  CandidateAttachMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateAttachService } from './candidate-attach.service';

@Controller('candidate-attach')
export class CandidateAttachController extends BaseMicroserviceController(
  CandidateAttachMessagePattern,
) {
  constructor(private readonly candidateAttachService: CandidateAttachService) {
    super(candidateAttachService);
  }
}
