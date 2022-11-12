import { Injectable } from '@baotg/core';
import { JobBudgetHistoryEntity, JobBudgetHistoryMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBudgetHistoryRepo extends MysqlRepo<JobBudgetHistoryEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_budget_history', mysqlService, new JobBudgetHistoryMapper());
  }
}
