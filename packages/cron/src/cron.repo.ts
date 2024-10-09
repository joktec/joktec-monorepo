import { DEFAULT_CON_ID, Injectable } from '@joktec/core';
import { In, MysqlRepo, MysqlService, Not } from '@joktec/mysql';
import { CronModel, CronStatus } from './models';

@Injectable()
export class CronRepo extends MysqlRepo<CronModel, string> {
  constructor(protected mysqlService: MysqlService) {
    super(mysqlService, CronModel, DEFAULT_CON_ID);
  }

  public async bulkCreate(crons: CronModel[]): Promise<CronModel[]> {
    return this.bulkUpsert(crons, ['id']);
  }

  public async getCrons(type: string, ids: string[] = []): Promise<CronModel[]> {
    return this.repository.find({ where: { type, id: In(ids) }, order: { date: 'ASC' } });
  }

  public async getDependCrons(types: string[], date: string): Promise<CronModel[]> {
    if (!types.length) return [];
    return this.repository.find({
      where: { date, type: In(types), status: Not(CronStatus.DONE) },
      order: { date: 'ASC' },
    });
  }
}
