import { BaseController, Controller, IBaseControllerProps } from '@joktec/core';
import { Setting } from './models';
import { SettingService } from './setting.service';

const props: IBaseControllerProps<Setting> = {
  dto: Setting,
};

@Controller('settings')
export class SettingController extends BaseController<Setting, string>(props) {
  constructor(protected settingService: SettingService) {
    super(settingService);
  }
}
