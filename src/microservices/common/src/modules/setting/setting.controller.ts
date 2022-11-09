import {
  BaseMicroserviceController,
  SettingMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { SettingService } from './setting.service';
import { PLURAL_NAME } from './setting.constants';

@Controller(PLURAL_NAME)
export class SettingController extends BaseMicroserviceController(
  SettingMessagePattern,
) {
  constructor(private readonly settingService: SettingService) {
    super(settingService);
  }
}
