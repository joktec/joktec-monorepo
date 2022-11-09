import { Controller } from '@nestjs/common';
import { JobhopJobLocationService } from './jobhop-joblocation.service';
import {
  BaseMicroserviceController,
  JobhopJobLocationMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-joblocation')
export class JobhopJobLocationController extends BaseMicroserviceController(
  JobhopJobLocationMessagePattern,
) {
  constructor(
    private readonly jobhopJobLocationService: JobhopJobLocationService,
  ) {
    super(jobhopJobLocationService);
  }
}
