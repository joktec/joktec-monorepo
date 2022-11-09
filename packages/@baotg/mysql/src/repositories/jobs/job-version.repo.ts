import { Injectable } from '@jobhopin/core';
import { JobVersionEntity, JobVersionMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobVersionRepo extends MysqlRepo<JobVersionEntity, string> {
  constructor(protected mysqlService: MysqlService) {
    super('job_version', mysqlService, new JobVersionMapper());
  }
}
