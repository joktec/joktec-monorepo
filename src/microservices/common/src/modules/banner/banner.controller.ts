import {
  BaseMicroserviceController,
  BannerMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { BannerService } from './banner.service';
import { PLURAL_NAME } from './banner.constants';

@Controller(PLURAL_NAME)
export class BannerController extends BaseMicroserviceController(
  BannerMessagePattern,
) {
  constructor(private readonly bannerService: BannerService) {
    super(bannerService);
  }
}
