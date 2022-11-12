import { Injectable } from '@baotg/core';
import { JobInterviewTiInChargeEntity, JobInterviewTiInChargeMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobInterviewTiInChargeRepo extends MysqlRepo<JobInterviewTiInChargeEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_interview_TI_in_charge', mysqlService, new JobInterviewTiInChargeMapper());
  }
}
