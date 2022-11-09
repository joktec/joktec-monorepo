import { Injectable } from '@jobhopin/core';
import { JobBudgetRequestEntity, JobBudgetRequestMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBudgetRequestRepo extends MysqlRepo<JobBudgetRequestEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_budget_request', mysqlService, new JobBudgetRequestMapper());
  }
}
