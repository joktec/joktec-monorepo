import { Controller } from '@nestjs/common';
import { RBannerActionService } from './r-banner-action.service';
import {
  BaseMicroserviceController,
  RBannerActionMessagePattern,
} from '@jobhopin/core';

@Controller('r-banner-action')
export class RBannerActionController extends BaseMicroserviceController(
  RBannerActionMessagePattern,
) {
  constructor(private readonly rBannerActionService: RBannerActionService) {
    super(rBannerActionService);
  }
}
