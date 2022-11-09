import { Controller } from '@nestjs/common';
import { JobhopJobDefaultImageService } from './jobhop-jobdefaultimage.service';
import {
  BaseMicroserviceController,
  JobhopJobDefaultImageMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-jobdefaultimage')
export class JobhopJobDefaultImageController extends BaseMicroserviceController(
  JobhopJobDefaultImageMessagePattern,
) {
  constructor(
    private readonly jobhopJobDefaultImageService: JobhopJobDefaultImageService,
  ) {
    super(jobhopJobDefaultImageService);
  }
}
