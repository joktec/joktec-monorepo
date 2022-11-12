import { Injectable } from '@baotg/core';
import { JobViewEntity, JobViewMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobViewRepo extends MysqlRepo<JobViewEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_view', mysqlService, new JobViewMapper());
  }
}
