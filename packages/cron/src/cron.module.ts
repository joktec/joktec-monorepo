import { Module } from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';
import { ScheduleModule } from '@nestjs/schedule';
import { CronRepo } from './cron.repo';

@Module({
  imports: [ScheduleModule.forRoot(), MysqlModule],
  providers: [CronRepo],
  exports: [CronRepo],
})
export class CronModule {}
