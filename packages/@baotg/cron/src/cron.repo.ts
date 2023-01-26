import { Injectable, DEFAULT_CON_ID } from '@baotg/core';
import { MysqlRepo, MysqlService } from '@baotg/mysql';
import { Cron, CronMapper, CronStatus } from './models';
import { chain } from 'lodash';

@Injectable()
export class CronRepo extends MysqlRepo<Cron, string> {
  constructor(protected mysqlService: MysqlService) {
    super('cron', mysqlService, new CronMapper());
  }

  public async upsert(cron: Cron, conId: string = DEFAULT_CON_ID): Promise<void> {
    const q = this.mysqlService
      .getClient(conId)
      .table(this.table)
      .insert(this.mapper.toPersistence(cron))
      .onConflict('id')
      .merge();
    await this.exec(q);
  }

  public async batchUpsert(crons: Cron[], conId: string = DEFAULT_CON_ID): Promise<void> {
    const trx = await this.mysqlService.getKnex(conId).transaction();
    try {
      const chunkCrons = chain(crons).map(this.mapper.toPersistence).chunk(100).value();
      for (const subCrons of chunkCrons) {
        await trx(this.table).insert(subCrons).onConflict('id').merge();
      }
      await trx.commit();
    } catch (e) {
      await trx.rollback(e);
    }
  }

  public async getCrons(type: string, ids: string[] = [], conId: string = DEFAULT_CON_ID): Promise<Cron[]> {
    const q = this.mysqlService
      .getClient(conId)
      .table(this.table)
      .where('type', type)
      .whereIn('id', ids)
      .orderBy('date', 'asc');
    const data = await this.exec(q);
    return data.map(this.mapper.toDomain);
  }

  public async getDependCrons(types: string[], date: string, conId: string = DEFAULT_CON_ID): Promise<Cron[]> {
    if (!types.length) {
      return [];
    }
    const q = this.mysqlService
      .getClient(conId)
      .table(this.table)
      .whereIn('type', types)
      .where('date', date)
      .whereNot('status', CronStatus.DONE)
      .orderBy('date', 'asc');
    const data = await this.exec(q);
    return data.map(this.mapper.toDomain);
  }
}
