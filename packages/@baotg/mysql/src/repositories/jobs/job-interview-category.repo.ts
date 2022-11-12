import { Injectable } from '@baotg/core';
import { JobInterviewCategoryEntity, JobInterviewCategoryMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobInterviewCategoryRepo extends MysqlRepo<JobInterviewCategoryEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_interview_category', mysqlService, new JobInterviewCategoryMapper());
  }
}
