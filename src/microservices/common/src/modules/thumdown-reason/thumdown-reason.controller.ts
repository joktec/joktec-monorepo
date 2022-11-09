import {
  BaseMicroserviceController,
  ThumbdownReasonMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { ThumdownReasonService } from './thumdown-reason.service';
import { PLURAL_NAME } from './thumdown-reason.constants';

@Controller(PLURAL_NAME)
export class ThumdownReasonController extends BaseMicroserviceController(
  ThumbdownReasonMessagePattern,
) {
  constructor(private readonly thumdownReasonService: ThumdownReasonService) {
    super(thumdownReasonService);
  }
}
