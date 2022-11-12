import { Injectable } from '@baotg/core';
import { JobScoreEntity, JobScoreMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobScoreRepo extends MysqlRepo<JobScoreEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_score', mysqlService, new JobScoreMapper());
  }
}
