import { Injectable } from '@jobhopin/core';
import { JobSearchEntity, JobSearchMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobSearchRepo extends MysqlRepo<JobSearchEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_search', mysqlService, new JobSearchMapper());
  }
}
