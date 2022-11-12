import { Injectable } from '@baotg/core';
import { JobSearchQuotaEntity, JobSearchQuotaMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobSearchQuotaRepo extends MysqlRepo<JobSearchQuotaEntity, string> {
  constructor(protected mysqlService: MysqlService) {
    super('job_search_quota', mysqlService, new JobSearchQuotaMapper());
  }
}
