import { Controller } from '@nestjs/common';
import { JobhopPaymentLinkService } from './jobhop-paymentlink.service';
import {
  BaseMicroserviceController,
  JobhopPaymentLinkMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-paymentlink')
export class JobhopPaymentLinkController extends BaseMicroserviceController(
  JobhopPaymentLinkMessagePattern,
) {
  constructor(
    private readonly jobhopPaymentLinkService: JobhopPaymentLinkService,
  ) {
    super(jobhopPaymentLinkService);
  }
}
