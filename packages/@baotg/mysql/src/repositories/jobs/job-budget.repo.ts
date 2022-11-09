import { Injectable } from '@jobhopin/core';
import { JobBudgetEntity, JobBudgetMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBudgetRepo extends MysqlRepo<JobBudgetEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_budget', mysqlService, new JobBudgetMapper());
  }
}
