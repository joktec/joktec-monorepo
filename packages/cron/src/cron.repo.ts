import { DEFAULT_CON_ID, Injectable } from '@joktec/core';
import { MysqlRepo, MysqlService, Op } from '@joktec/mysql';
import { CronModel, CronStatus } from './models';

@Injectable()
export class CronRepo extends MysqlRepo<CronModel, string> {
  constructor(protected mysqlService: MysqlService) {
    super(mysqlService, CronModel, DEFAULT_CON_ID);
  }

  public async bulkCreate(crons: CronModel[]): Promise<CronModel[]> {
    return this.model.bulkCreate(crons, { updateOnDuplicate: ['id'], returning: true });
  }

  public async getCrons(type: string, ids: string[] = []): Promise<CronModel[]> {
    return this.model.findAll({
      where: { type, id: { [Op.in]: ids } },
      order: ['date', 'ASC'],
    });
  }

  public async getDependCrons(types: string[], date: string): Promise<CronModel[]> {
    if (!types.length) return [];
    return this.model.findAll({
      where: { date, type: { [Op.in]: types }, status: { [Op.not]: CronStatus.DONE } },
      order: ['date', 'ASC'],
    });
  }
}
