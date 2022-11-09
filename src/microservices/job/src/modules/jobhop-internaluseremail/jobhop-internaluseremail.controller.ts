import { Controller } from '@nestjs/common';
import { JobhopInternalUserEmailService } from './jobhop-internaluseremail.service';
import {
  BaseMicroserviceController,
  JobhopInternalUserEmailMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-internaluseremail')
export class JobhopInternalUserEmailController extends BaseMicroserviceController(
  JobhopInternalUserEmailMessagePattern,
) {
  constructor(
    private readonly jobhopInternalUserEmailService: JobhopInternalUserEmailService,
  ) {
    super(jobhopInternalUserEmailService);
  }
}
