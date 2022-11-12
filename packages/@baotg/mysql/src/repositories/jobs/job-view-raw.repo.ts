import { Injectable } from '@baotg/core';
import { JobViewRawEntity, JobViewRawMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobViewRawRepo extends MysqlRepo<JobViewRawEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_view_raw', mysqlService, new JobViewRawMapper());
  }
}
