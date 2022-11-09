import { Controller } from '@nestjs/common';
import { JobhopUserJobSentreccService } from './jobhop-userjobsentrecc.service';
import {
  BaseMicroserviceController,
  JobhopUserJobSentreccMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-userjobsentrecc')
export class JobhopUserJobSentreccController extends BaseMicroserviceController(
  JobhopUserJobSentreccMessagePattern,
) {
  constructor(
    private readonly jobhopUserJobSentreccService: JobhopUserJobSentreccService,
  ) {
    super(jobhopUserJobSentreccService);
  }
}
