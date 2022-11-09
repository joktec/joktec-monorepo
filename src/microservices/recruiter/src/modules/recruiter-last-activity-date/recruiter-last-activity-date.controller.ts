import { Controller } from '@nestjs/common';
import { RecruiterLastActivityDateService } from './recruiter-last-activity-date.service';
import {
  BaseMicroserviceController,
  RecruiterLastActivityDateMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-last-activity-date')
export class RecruiterLastActivityDateController extends BaseMicroserviceController(
  RecruiterLastActivityDateMessagePattern,
) {
  constructor(
    private readonly recruiterLastActivityDateService: RecruiterLastActivityDateService,
  ) {
    super(recruiterLastActivityDateService);
  }
}
