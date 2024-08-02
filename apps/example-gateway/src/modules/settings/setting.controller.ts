import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Setting } from '../../models/entities';
import { SettingService } from './setting.service';

const props: IControllerProps<Setting> = {
  dto: Setting,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
};

@Controller('settings')
export class SettingController extends BaseController<Setting, string>(props) {
  constructor(protected settingService: SettingService) {
    super(settingService);
  }
}
