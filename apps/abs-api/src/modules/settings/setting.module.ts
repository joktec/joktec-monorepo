import { Module } from '@joktec/core';
import { SettingController } from './setting.controller';
import { SettingRepo } from './setting.repo';
import { SettingService } from './setting.service';

@Module({
  controllers: [SettingController],
  providers: [SettingRepo, SettingService],
  exports: [SettingService],
})
export class SettingModule {}
