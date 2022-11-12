import { Injectable } from '@baotg/core';
import { JobBountyHistoryEntity, JobBountyHistoryMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBountyHistoryRepo extends MysqlRepo<JobBountyHistoryEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_bounty_history', mysqlService, new JobBountyHistoryMapper());
  }
}
