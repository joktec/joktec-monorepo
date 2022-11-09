import { Injectable } from '@jobhopin/core';
import { JobTemplateEntity, JobTemplateMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobTemplateRepo extends MysqlRepo<JobTemplateEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_template', mysqlService, new JobTemplateMapper());
  }
}
