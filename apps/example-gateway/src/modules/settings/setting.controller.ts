import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { Setting } from '../../models/schemas';
import { SettingService } from './setting.service';

const props: IControllerProps<Setting> = {
  dto: Setting,
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('settings')
export class SettingController extends BaseController<Setting, string>(props) {
  constructor(protected settingService: SettingService) {
    super(settingService);
  }
}
