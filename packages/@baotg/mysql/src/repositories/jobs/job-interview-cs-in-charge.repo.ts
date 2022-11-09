import { Injectable } from '@jobhopin/core';
import { JobInterviewCsInChargeEntity, JobInterviewCsInChargeMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobInterviewCsInChargeRepo extends MysqlRepo<JobInterviewCsInChargeEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_interview_CS_in_charge', mysqlService, new JobInterviewCsInChargeMapper());
  }
}
