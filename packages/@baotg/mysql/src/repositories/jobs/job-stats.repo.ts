import { Injectable } from '@jobhopin/core';
import { JobStatsEntity, JobStatsMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobStatsRepo extends MysqlRepo<JobStatsEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_stats', mysqlService, new JobStatsMapper());
  }
}
