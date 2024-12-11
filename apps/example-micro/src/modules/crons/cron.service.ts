import { BaseService, cloneInstance, DeepPartial, Injectable } from '@joktec/core';
import { CrontabStatus } from '@joktec/cron';
import { SuccessResponse } from '../../common';
import { CronSchema } from '../../models/schemas';
import { CronRepo } from '../../repositories';
import { CronScheduler } from './cron.scheduler';

@Injectable()
export class CronService extends BaseService<CronSchema, string> {
  constructor(
    protected cronRepo: CronRepo,
    private cronScheduler: CronScheduler,
  ) {
    super(cronRepo);
  }

  async update(id: string, entity: DeepPartial<CronSchema>): Promise<CronSchema> {
    const processEntity: DeepPartial<CronSchema> = cloneInstance(entity);
    const cron = await this.repository.update({ id }, processEntity);
    cron.status === CrontabStatus.ACTIVATED && (await this.cronScheduler.startCron(cron, true));
    cron.status === CrontabStatus.DISABLED && (await this.cronScheduler.stopCron(cron));
    return cron;
  }

  async refresh(cron?: CronSchema): Promise<SuccessResponse> {
    if (cron) return this.cronScheduler.refreshOne(cron);
    return this.cronScheduler.refreshAllCrons();
  }

  async trigger(cronId: string, waiting?: boolean): Promise<SuccessResponse> {
    return this.cronScheduler.trigger(cronId, waiting);
  }
}
