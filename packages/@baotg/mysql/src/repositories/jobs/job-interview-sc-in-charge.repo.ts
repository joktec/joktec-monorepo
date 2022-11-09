import { Injectable } from '@jobhopin/core';
import { JobInterviewScInChargeEntity, JobInterviewScInChargeMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobInterviewScInChargeRepo extends MysqlRepo<JobInterviewScInChargeEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_interview_SC_in_charge', mysqlService, new JobInterviewScInChargeMapper());
  }
}
