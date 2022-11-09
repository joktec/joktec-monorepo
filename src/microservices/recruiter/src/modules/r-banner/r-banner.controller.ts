import { Controller } from '@nestjs/common';
import { RBannerService } from './r-banner.service';
import {
  BaseMicroserviceController,
  RBannerMessagePattern,
} from '@jobhopin/core';

@Controller('r-banner')
export class RBannerController extends BaseMicroserviceController(
  RBannerMessagePattern,
) {
  constructor(private readonly rBannerService: RBannerService) {
    super(rBannerService);
  }
}
