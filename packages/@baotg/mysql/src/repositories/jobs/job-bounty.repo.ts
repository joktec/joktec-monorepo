import { Injectable } from '@baotg/core';
import { JobBountyEntity, JobBountyMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBountyRepo extends MysqlRepo<JobBountyEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_bounty', mysqlService, new JobBountyMapper());
  }
}
