import { Controller } from '@nestjs/common';
import { RecruiterJobjmcreditService } from './recruiter-jobjmcredit.service';
import {
  BaseMicroserviceController,
  RecruiterJobjmcreditMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-jobjmcredit')
export class RecruiterJobjmcreditController extends BaseMicroserviceController(
  RecruiterJobjmcreditMessagePattern,
) {
  constructor(
    private readonly recruiterJobjmcreditService: RecruiterJobjmcreditService,
  ) {
    super(recruiterJobjmcreditService);
  }
}
