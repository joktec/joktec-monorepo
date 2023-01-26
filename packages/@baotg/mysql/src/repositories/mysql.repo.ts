import { toArray } from '@baotg/core';
import { MysqlMapper } from '../models';
import { MysqlWriteRepoClient } from '../mysql.client';
import { MysqlService } from '../mysql.service';
import { uuid } from 'uuidv4';
import { Knex } from 'knex';
import { MysqlReadRepo } from './mysql-read.repo';

export abstract class MysqlRepo<T, ID> extends MysqlReadRepo<T, ID> implements MysqlWriteRepoClient<T, ID> {
  protected constructor(
    protected table: string,
    protected mysqlService: MysqlService,
    protected mapper: MysqlMapper<T>,
    protected conId?: string,
    protected slaveNode?: string,
  ) {
    super(table, mysqlService, mapper, conId, slaveNode);
  }

  protected write(trx?: Knex.Transaction): Knex.QueryBuilder {
    const qb = this.mysqlService.getKnex(this.conId).queryBuilder().table(this.table);
    if (trx) qb.transacting(trx);
    return qb;
  }

  async insert(entity: T, opts?: { trx?: Knex.Transaction }): Promise<T> {
    const insertedValue: any = this.mapper.toPersistence(entity, this.mapperOpts);
    const primaryColumn = await this.getPrimaryColumn();
    const primaryKey = primaryColumn.name;
    if (!insertedValue[primaryKey] && primaryColumn.dataType === 'varchar') {
      insertedValue[primaryKey] = uuid();
    }

    const qb = this.write(opts?.trx).insert(insertedValue);
    const res = await this.mysqlService.exec(qb);
    const id: ID = res[0] || insertedValue[primaryKey];
    return this.findOne(id, { trx: opts?.trx });
  }

  async update(id: ID, entity: T, opts?: { trx?: Knex.Transaction }): Promise<T> {
    const updatedValue: any = this.mapper.toPersistence(entity, this.mapperOpts);
    const primaryColumn = await this.getPrimaryColumn();
    delete updatedValue[primaryColumn.name];
    const qb = this.write(opts?.trx).where(primaryColumn.name, '=', id).update(updatedValue);
    await this.mysqlService.exec(qb);
    return this.findOne(id);
  }

  async updateFields(id: ID, updatedValue: object, opts?: { trx?: Knex.Transaction }): Promise<void> {
    const primaryColumn = await this.getPrimaryColumn();
    const qb = this.write(opts?.trx).where(primaryColumn.name, '=', id).update(updatedValue);

    await this.mysqlService.exec(qb);
  }

  async delete(ids: ID | ID[], opts?: { trx?: Knex.Transaction }): Promise<number> {
    const idsToDel: ID[] = toArray<ID>(ids);
    const primaryColumn = await this.getPrimaryColumn();
    const qb = this.write(opts?.trx).whereIn(primaryColumn.name, idsToDel);
    const matchKey = {
      deleted_at: this.mysqlService.getKnex().fn.now(6),
      delete_at: this.mysqlService.getKnex().fn.now(6),
      is_deleted: 1,
      is_delete: 1,
      deleted: 1,
    };

    const inspector = this.mysqlService.getInspector(this.conId);
    for (const key of Object.keys(matchKey)) {
      if (await inspector.hasColumn(this.table, key)) {
        qb.update({ [key]: matchKey[key] });
        await this.mysqlService.exec(qb);
        return idsToDel.length;
      }
    }

    qb.del();
    await this.mysqlService.exec(qb);
    return idsToDel.length;
  }
}
