import { Controller } from '@nestjs/common';
import { JobhopFptoLadipageLogService } from './jobhop-fptoladipagelog.service';
import {
  BaseMicroserviceController,
  JobhopFptoLadipageLogMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-fptoladipagelog')
export class JobhopFptoLadipageLogController extends BaseMicroserviceController(
  JobhopFptoLadipageLogMessagePattern,
) {
  constructor(
    private readonly jobhopFptoLadipageLogService: JobhopFptoLadipageLogService,
  ) {
    super(jobhopFptoLadipageLogService);
  }
}
