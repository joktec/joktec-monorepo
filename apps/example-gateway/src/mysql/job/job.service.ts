import { Injectable } from '@baotg/core';
import { JobEntity, JobMapper, MysqlService } from '@baotg/mysql';

@Injectable()
export class JobService {
  private readonly table = 'jobs';

  constructor(private mysqlService: MysqlService) {}

  public async queryJob(): Promise<JobEntity[]> {
    const qb = this.mysqlService
      .qb(this.table)
      .where('salaryMin', '>', 1000)
      .orWhere(builder => {
        return builder.where('salaryMin', '>', 100).where('salaryMax', '<', 800);
      })
      .andWhere('totalView', '>', 100)
      .limit(100)
      .offset(0)
      .orderBy('createdDate', 'desc');

    const res = await this.mysqlService.exec<JobEntity[]>(qb);
    return res.map(r => new JobMapper().toDomain(r));
  }
}
