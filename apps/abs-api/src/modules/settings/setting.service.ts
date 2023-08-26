import { BaseService, Injectable } from '@joktec/core';
import { Setting } from './models';
import { SettingRepo } from './setting.repo';

@Injectable()
export class SettingService extends BaseService<Setting, string> {
  constructor(protected settingRepo: SettingRepo) {
    super(settingRepo);
  }
}
