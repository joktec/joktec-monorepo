import { Injectable } from '@jobhopin/core';
import { JobTitleEntity, JobTitleMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobTitleRepo extends MysqlRepo<JobTitleEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_title', mysqlService, new JobTitleMapper());
  }
}
