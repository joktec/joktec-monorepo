import { Injectable } from '@jobhopin/core';
import { JobSalaryTemplateEntity, JobSalaryTemplateMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobSalaryTemplateRepo extends MysqlRepo<JobSalaryTemplateEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_salary_template', mysqlService, new JobSalaryTemplateMapper());
  }
}
