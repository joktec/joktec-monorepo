import { BaseService, cloneInstance, DeepPartial, ICondition, Injectable } from '@joktec/core';
import { SuccessResponse } from '../../common';
import { CronStatus } from '../../models/constants';
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
    const condition: ICondition<CronSchema> = { _id: id };
    const processEntity: DeepPartial<CronSchema> = cloneInstance(entity);
    const cron = await this.repository.update(condition, processEntity);
    cron.status === CronStatus.ACTIVATED && (await this.cronScheduler.startCron(cron, true));
    cron.status === CronStatus.DISABLED && (await this.cronScheduler.stopCron(cron));
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
