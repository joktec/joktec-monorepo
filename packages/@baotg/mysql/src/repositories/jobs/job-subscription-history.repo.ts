import { Injectable } from '@baotg/core';
import { JobSubscriptionHistoryEntity, JobSubscriptionHistoryMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobSubscriptionHistoryRepo extends MysqlRepo<JobSubscriptionHistoryEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_subscription_history', mysqlService, new JobSubscriptionHistoryMapper());
  }
}
