import { Injectable } from '@baotg/core';
import { JobCategoryEntity, JobCategoryMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobCategoryRepo extends MysqlRepo<JobCategoryEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_category', mysqlService, new JobCategoryMapper());
  }
}
