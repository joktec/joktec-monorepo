import { Injectable } from '@baotg/core';
import { JobBoardApplyLogEntity, JobBoardApplyLogMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobBoardApplyLogRepo extends MysqlRepo<JobBoardApplyLogEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_board_apply_log', mysqlService, new JobBoardApplyLogMapper());
  }
}
