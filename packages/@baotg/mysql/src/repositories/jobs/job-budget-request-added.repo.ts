import { Injectable } from '@jobhopin/core';
import { JobBudgetRequestAddedEntity, JobBudgetRequestAddedMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBudgetRequestAddedRepo extends MysqlRepo<JobBudgetRequestAddedEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_budget_request_added', mysqlService, new JobBudgetRequestAddedMapper());
  }
}
