import { Injectable } from '@baotg/core';
import { JobThumdownReasonEntity, JobThumdownReasonMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobThumdownReasonRepo extends MysqlRepo<JobThumdownReasonEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_thumdown_reason', mysqlService, new JobThumdownReasonMapper());
  }
}
