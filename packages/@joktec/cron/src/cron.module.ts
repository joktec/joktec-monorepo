import { Module } from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';
import { CronRepo } from './cron.repo';

@Module({
  imports: [MysqlModule],
  providers: [CronRepo],
  exports: [CronRepo],
})
export class CronModule {}
