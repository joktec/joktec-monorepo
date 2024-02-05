import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { Setting } from '../../models/entities';
import { SettingService } from './setting.service';

const props: IControllerProps<Setting> = {
  dto: Setting,
  bearer: AuthGuard,
  guards: RoleGuard,
};

@Controller('settings')
export class SettingController extends BaseController<Setting, string>(props) {
  constructor(protected settingService: SettingService) {
    super(settingService);
  }
}
