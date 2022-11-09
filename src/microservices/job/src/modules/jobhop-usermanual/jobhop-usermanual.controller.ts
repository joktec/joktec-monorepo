import { Controller } from '@nestjs/common';
import { JobhopUserManualService } from './jobhop-usermanual.service';
import {
  BaseMicroserviceController,
  JobhopUserManualMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-usermanual')
export class JobhopUserManualController extends BaseMicroserviceController(
  JobhopUserManualMessagePattern,
) {
  constructor(
    private readonly jobhopUserManualService: JobhopUserManualService,
  ) {
    super(jobhopUserManualService);
  }
}
