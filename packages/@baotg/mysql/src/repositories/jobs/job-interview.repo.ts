import { Injectable } from '@jobhopin/core';
import { JobInterviewEntity, JobInterviewMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobInterviewRepo extends MysqlRepo<JobInterviewEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_interview', mysqlService, new JobInterviewMapper());
  }
}
