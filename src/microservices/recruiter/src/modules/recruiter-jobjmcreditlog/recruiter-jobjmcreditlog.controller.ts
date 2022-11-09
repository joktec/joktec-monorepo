import { Controller } from '@nestjs/common';
import { RecruiterJobjmcreditlogService } from './recruiter-jobjmcreditlog.service';
import {
  BaseMicroserviceController,
  RecruiterJobjmcreditlogMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-jobjmcreditlog')
export class RecruiterJobjmcreditlogController extends BaseMicroserviceController(
  RecruiterJobjmcreditlogMessagePattern,
) {
  constructor(
    private readonly recruiterJobjmcreditlogService: RecruiterJobjmcreditlogService,
  ) {
    super(recruiterJobjmcreditlogService);
  }
}
