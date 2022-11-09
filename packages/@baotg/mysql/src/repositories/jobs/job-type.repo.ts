import { Injectable } from '@jobhopin/core';
import { JobTypeEntity, JobTypeMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobTypeRepo extends MysqlRepo<JobTypeEntity, string> {
  constructor(protected mysqlService: MysqlService) {
    super('job_type', mysqlService, new JobTypeMapper());
  }
}
