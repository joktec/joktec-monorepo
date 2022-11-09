import { Injectable } from '@jobhopin/core';
import { JobTemplatesEntity, JobTemplatesMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobTemplatesRepo extends MysqlRepo<JobTemplatesEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_templates', mysqlService, new JobTemplatesMapper());
  }
}
