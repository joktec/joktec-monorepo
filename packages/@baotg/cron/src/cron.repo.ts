import { Injectable, DEFAULT_CON_ID } from '@baotg/core';
import { MysqlRepo, MysqlService, Op } from '@baotg/mysql';
import { CronModel, CronStatus } from './models';
import { chunk } from 'lodash';

@Injectable()
export class CronRepo extends MysqlRepo<CronModel, string> {
  constructor(protected mysqlService: MysqlService) {
    super(mysqlService, CronModel, DEFAULT_CON_ID);
  }

  public async batchUpsert(crons: CronModel[]): Promise<CronModel[]> {
    const transaction = await this.mysqlService.getClient(this.conId).transaction();
    try {
      const newCrons: CronModel[] = [];
      const chunkCrons = chunk(crons, 100);
      for (const subCrons of chunkCrons) {
        const rows = await this.model.bulkCreate(crons, { transaction, updateOnDuplicate: ['id'], returning: true });
        newCrons.push(...rows);
      }
      await transaction.commit();
      return newCrons;
    } catch (e) {
      await transaction.rollback();
      return crons;
    }
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
      where: {
        type: { [Op.in]: types },
        date,
        status: { [Op.not]: CronStatus.DONE },
      },
      order: ['date', 'ASC'],
    });
  }
}
