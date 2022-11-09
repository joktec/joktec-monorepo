import { Injectable } from '@jobhopin/core';
import { JobLikeEntity, JobLikeMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobLikeRepo extends MysqlRepo<JobLikeEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_like', mysqlService, new JobLikeMapper());
  }
}
