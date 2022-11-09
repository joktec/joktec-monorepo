import { Controller } from '@nestjs/common';
import { JobhopNotiMessageDetailService } from './jobhop-notimessagedetail.service';
import {
  BaseMicroserviceController,
  JobhopNotiMessageDetailMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-notimessagedetail')
export class JobhopNotiMessageDetailController extends BaseMicroserviceController(
  JobhopNotiMessageDetailMessagePattern,
) {
  constructor(
    private readonly jobhopNotiMessageDetailService: JobhopNotiMessageDetailService,
  ) {
    super(jobhopNotiMessageDetailService);
  }
}
