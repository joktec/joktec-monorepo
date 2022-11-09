import {
  BaseMicroserviceController,
  PlatformMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PLURAL_NAME } from './platform.constants';

@Controller(PLURAL_NAME)
export class PlatformController extends BaseMicroserviceController(
  PlatformMessagePattern,
) {
  constructor(private readonly platformService: PlatformService) {
    super(platformService);
  }
}
