import { Controller } from '@nestjs/common';
import { RecruiterCandidatestatusmessageService } from './recruiter-candidatestatusmessage.service';
import {
  BaseMicroserviceController,
  RecruiterCandidatestatusmessageMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-candidatestatusmessage')
export class RecruiterCandidatestatusmessageController extends BaseMicroserviceController(
  RecruiterCandidatestatusmessageMessagePattern,
) {
  constructor(
    private readonly recruiterCandidatestatusmessageService: RecruiterCandidatestatusmessageService,
  ) {
    super(recruiterCandidatestatusmessageService);
  }
}
