import { Controller } from '@nestjs/common';
import { JobhopJobMatchCounterService } from './jobhop-jobmatchcounter.service';
import {
  BaseMicroserviceController,
  JobhopJobMatchCounterMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-jobmatchcounter')
export class JobhopJobMatchCounterController extends BaseMicroserviceController(
  JobhopJobMatchCounterMessagePattern,
) {
  constructor(
    private readonly jobhopJobMatchCounterService: JobhopJobMatchCounterService,
  ) {
    super(jobhopJobMatchCounterService);
  }
}
