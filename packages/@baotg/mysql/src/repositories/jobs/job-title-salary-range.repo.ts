import { Injectable } from '@baotg/core';
import { JobTitleSalaryRangeEntity, JobTitleSalaryRangeMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobTitleSalaryRangeRepo extends MysqlRepo<JobTitleSalaryRangeEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_title_salary_range', mysqlService, new JobTitleSalaryRangeMapper());
  }
}
