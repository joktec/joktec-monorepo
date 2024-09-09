import { BaseService, Injectable } from '@joktec/core';
import { Setting } from '../../models/schemas';
import { SettingRepo } from '../../repositories';

@Injectable()
export class SettingService extends BaseService<Setting, string> {
  constructor(protected settingRepo: SettingRepo) {
    super(settingRepo);
  }
}
