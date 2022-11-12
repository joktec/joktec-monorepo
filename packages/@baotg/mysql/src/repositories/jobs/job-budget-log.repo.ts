import { Injectable } from '@baotg/core';
import { JobBudgetLogEntity, JobBudgetLogMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBudgetLogRepo extends MysqlRepo<JobBudgetLogEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_budget_log', mysqlService, new JobBudgetLogMapper());
  }
}
