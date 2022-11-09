import {
  BaseMicroserviceController,
  RecruiterCandidatestatusMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { RecruiterCandidatestatusService } from './recruiter-candidatestatus.service';

@Controller('recruiter-candidatestatus')
export class RecruiterCandidatestatusController extends BaseMicroserviceController(
  RecruiterCandidatestatusMessagePattern,
) {
  constructor(
    private readonly recruiterCandidatestatusService: RecruiterCandidatestatusService,
  ) {
    super(recruiterCandidatestatusService);
  }
}
