import { Module } from '@baotg/core';
import { MysqlModule } from '@baotg/mysql';
import { CronRepo } from './cron.repo';

@Module({
  imports: [MysqlModule],
  providers: [CronRepo],
  exports: [CronRepo],
})
export class CronModule {}
