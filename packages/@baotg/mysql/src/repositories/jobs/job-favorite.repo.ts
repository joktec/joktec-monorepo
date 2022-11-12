import { Injectable } from '@baotg/core';
import { JobFavoriteEntity, JobFavoriteMapper } from '../../entities';
import { MysqlRepo } from '../mysql.repo';
import { MysqlService } from '../../mysql.service';

@Injectable()
export class JobFavoriteRepo extends MysqlRepo<JobFavoriteEntity, number> {
  constructor(protected mysqlService: MysqlService) {
    super('job_favorite', mysqlService, new JobFavoriteMapper());
  }
}
