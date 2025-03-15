import { Module } from '@joktec/core';
import { ScheduleModule } from '@joktec/cron';
import { CronController } from './cron.controller';
import { CronScheduler } from './cron.scheduler';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CronController],
  providers: [CronScheduler, CronService],
  exports: [CronScheduler, CronService],
})
export class CronModule {}
