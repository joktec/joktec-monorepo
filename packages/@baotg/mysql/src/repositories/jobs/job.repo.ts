import { Injectable } from '@jobhopin/core';
import { JobEntity, JobMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobRepo extends MysqlRepo<JobEntity, string> {
  constructor(protected mysqlService: MysqlService) {
    super('job', mysqlService, new JobMapper());
  }
}
