import { Controller } from '@nestjs/common';
import { RecruiterJobjmcreditplanService } from './recruiter-jobjmcreditplan.service';
import {
  BaseMicroserviceController,
  RecruiterJobjmcreditplanMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-jobjmcreditplan')
export class RecruiterJobjmcreditplanController extends BaseMicroserviceController(
  RecruiterJobjmcreditplanMessagePattern,
) {
  constructor(
    private readonly recruiterJobjmcreditplanService: RecruiterJobjmcreditplanService,
  ) {
    super(recruiterJobjmcreditplanService);
  }
}
