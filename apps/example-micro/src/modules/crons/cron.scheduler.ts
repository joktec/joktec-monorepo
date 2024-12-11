import { Injectable } from '@joktec/core';
import { CrontabScheduler } from '@joktec/cron';
import { CronHistoryRepo, CronRepo } from '../../repositories';

@Injectable()
export class CronScheduler extends CrontabScheduler {
  constructor(
    protected cronRepo: CronRepo,
    protected cronHistoryRepo: CronHistoryRepo,
  ) {
    super(cronRepo, cronHistoryRepo);
  }
}
