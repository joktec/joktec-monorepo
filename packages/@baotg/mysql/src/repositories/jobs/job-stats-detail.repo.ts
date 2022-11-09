import { Injectable } from '@jobhopin/core';
import { JobStatsDetailEntity, JobStatsDetailMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobStatsDetailRepo extends MysqlRepo<JobStatsDetailEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_stats_detail', mysqlService, new JobStatsDetailMapper());
  }
}
