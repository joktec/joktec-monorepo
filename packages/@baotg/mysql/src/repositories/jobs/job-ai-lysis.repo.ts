import { Injectable } from '@jobhopin/core';
import { JobAiLysisEntity, JobAiLysisMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobAiLysisRepo extends MysqlRepo<JobAiLysisEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_ai_lysis', mysqlService, new JobAiLysisMapper());
  }
}
