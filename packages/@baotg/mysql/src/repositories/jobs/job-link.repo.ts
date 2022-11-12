import { Injectable } from '@baotg/core';
import { JobLinkEntity, JobLinkMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobLinkRepo extends MysqlRepo<JobLinkEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_link', mysqlService, new JobLinkMapper());
  }
}
