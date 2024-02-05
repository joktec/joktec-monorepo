import { BaseService, Injectable } from '@joktec/core';
import { Setting } from '../../models/entities';
import { SettingRepo } from '../../repositories';

@Injectable()
export class SettingService extends BaseService<Setting, string> {
  constructor(protected settingRepo: SettingRepo) {
    super(settingRepo);
  }
}
