import { BaseController, Controller, IBaseControllerProps, RequestMethod } from '@joktec/core';
import { RouteInfo } from '@nestjs/common/interfaces/middleware/middleware-configuration.interface';
import { AdminInterceptor } from '../../base';
import { Setting } from './models';
import { SettingService } from './setting.service';

const props: IBaseControllerProps<Setting> = {
  dto: Setting,
  hooks: {
    create: [AdminInterceptor],
    update: [AdminInterceptor],
    delete: [AdminInterceptor],
  },
};

@Controller('settings')
export class SettingController extends BaseController<Setting, string>(props) {
  constructor(protected settingService: SettingService) {
    super(settingService);
  }

  static excludeRoute(): RouteInfo {
    return { path: 'settings', method: RequestMethod.GET };
  }
}
