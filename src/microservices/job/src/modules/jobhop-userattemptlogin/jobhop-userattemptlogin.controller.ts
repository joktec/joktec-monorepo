import { Controller } from '@nestjs/common';
import { JobhopUserAttemptLoginService } from './jobhop-userattemptlogin.service';
import {
  BaseMicroserviceController,
  JobhopUserAttemptLoginMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-userattemptlogin')
export class JobhopUserAttemptLoginController extends BaseMicroserviceController(
  JobhopUserAttemptLoginMessagePattern,
) {
  constructor(
    private readonly jobhopUserAttemptLoginService: JobhopUserAttemptLoginService,
  ) {
    super(jobhopUserAttemptLoginService);
  }
}
