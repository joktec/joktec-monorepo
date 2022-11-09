import { Controller } from '@nestjs/common';
import { JobGroupBurntCreditsService } from './jobgroup-burnt-credits.service';
import {
  BaseMicroserviceController,
  JobGroupBurntCreditsMessagePattern,
} from '@jobhopin/core';

@Controller('jobgroup-burnt-credits')
export class JobGroupBurntCreditsController extends BaseMicroserviceController(
  JobGroupBurntCreditsMessagePattern,
) {
  constructor(
    private readonly jobGroupBurntCreditsService: JobGroupBurntCreditsService,
  ) {
    super(jobGroupBurntCreditsService);
  }
}
