import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { Setting } from './models';
import { SettingService } from './setting.service';

const props: IControllerProps<Setting> = {
  dto: Setting,
};

@Controller('settings')
export class SettingController extends BaseController<Setting, string>(props) {
  constructor(protected settingService: SettingService) {
    super(settingService);
  }
}
