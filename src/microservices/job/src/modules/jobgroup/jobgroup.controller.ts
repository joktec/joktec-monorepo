import { Controller } from '@nestjs/common';
import { JobGroupService } from './jobgroup.service';
import {
  BaseMicroserviceController,
  JobGroupMessagePattern,
} from '@jobhopin/core';

@Controller('jobgroup')
export class JobGroupController extends BaseMicroserviceController(
  JobGroupMessagePattern,
) {
  constructor(private readonly jobGroupService: JobGroupService) {
    super(jobGroupService);
  }
}
