import { Injectable, LogService, OnModuleInit } from '@jobhopin/core';
import { JobEntity, JobRepo, PageableResponse } from '@jobhopin/mysql';
import { JobService } from './job';

@Injectable()
export class MysqlExampleService implements OnModuleInit {
  constructor(private jobRepo: JobRepo, private jobService: JobService, private logService: LogService) {}

  async onModuleInit() {
    // Case 1: Base CRUD
    const pageableJobs: PageableResponse<JobEntity> = await this.jobRepo.findAll({
      where: [['salaryMin', '>', 1000]],
      limit: 10,
      page: 1,
    });
    this.logService.info('Job CRUD: %j', pageableJobs);

    // Case 2: Use direct knex for complex query
    const jobs: JobEntity[] = await this.jobService.queryJob();
    this.logService.info('Job Knex: %j', jobs);
  }
}
