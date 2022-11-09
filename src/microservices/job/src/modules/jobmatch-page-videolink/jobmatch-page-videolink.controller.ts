import { Controller } from '@nestjs/common';
import { JobMatchPageVideolinkService } from './jobmatch-page-videolink.service';
import {
  BaseMicroserviceController,
  JobMatchPageVideoLinkMessagePattern,
} from '@jobhopin/core';

@Controller('jobmatch-page-videolink')
export class JobMatchPageVideolinkController extends BaseMicroserviceController(
  JobMatchPageVideoLinkMessagePattern,
) {
  constructor(
    private readonly jobMatchPageVideolinkService: JobMatchPageVideolinkService,
  ) {
    super(jobMatchPageVideolinkService);
  }
}
