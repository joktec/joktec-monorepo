import {
  BaseMicroserviceController,
  AssignedJobMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { AssignedJobService } from './assigned-job.service';

@Controller('benefits')
export class AssignedJobController extends BaseMicroserviceController(
  AssignedJobMessagePattern,
) {
  constructor(private readonly benefitService: AssignedJobService) {
    super(benefitService);
  }
}
