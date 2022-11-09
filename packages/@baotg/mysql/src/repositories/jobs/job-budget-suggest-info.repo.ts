import { Injectable } from '@jobhopin/core';
import { JobBudgetSuggestInfoEntity, JobBudgetSuggestInfoMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBudgetSuggestInfoRepo extends MysqlRepo<JobBudgetSuggestInfoEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_budget_suggest_info', mysqlService, new JobBudgetSuggestInfoMapper());
  }
}
