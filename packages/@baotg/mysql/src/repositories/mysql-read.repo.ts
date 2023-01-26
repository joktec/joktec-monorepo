import { toBool } from '@baotg/core';
import { MysqlMapper, PageableRequest, PageableResponse, RawBinding } from '../models';
import { MysqlReadRepoClient } from '../mysql.client';
import { MysqlService } from '../mysql.service';
import { buildKeyword, buildQuery, buildSorter, excludeDeleted, isDeleted } from '../mysql.utils';
import { Column } from 'knex-schema-inspector/dist/types/column';
import { Knex } from 'knex';
import { SchemaInspector } from 'knex-schema-inspector/lib/types/schema-inspector';
import { ClassTransformOptions } from 'class-transformer';

export abstract class MysqlReadRepo<T, ID> implements MysqlReadRepoClient<T, ID> {
  protected constructor(
    protected table: string,
    protected mysqlService: MysqlService,
    protected mapper: MysqlMapper<T>,
    protected conId?: string,
    protected slaveNode?: string,
  ) {}

  protected async getTransaction(config?: Knex.TransactionConfig): Promise<Knex.Transaction> {
    return this.mysqlService.getKnex(this.conId).transaction(config);
  }

  protected query(trx?: Knex.Transaction): Knex.QueryBuilder {
    if (trx) {
      return this.mysqlService.getKnex(this.conId).queryBuilder().table(this.table).transacting(trx);
    }
    return this.mysqlService.getSlaveKnex(this.slaveNode, this.conId).queryBuilder().table(this.table);
  }

  protected exec<T extends {} = any>(qb: Knex.QueryBuilder): Promise<T | T[]> {
    return this.mysqlService.exec(qb);
  }

  protected get mapperOpts(): ClassTransformOptions {
    return { excludeExtraneousValues: true, exposeUnsetFields: false };
  }

  protected get inspector(): SchemaInspector {
    return this.mysqlService.getInspector(this.conId);
  }

  protected async getPrimaryColumn(): Promise<{ name: string; dataType: string }> {
    const primaryKey = await this.inspector.primary(this.table);
    const primaryColumn: Column = await this.inspector.columnInfo(this.table, primaryKey);
    return {
      name: primaryColumn?.name || 'id',
      dataType: primaryColumn?.data_type || 'varchar',
    };
  }

  async findAll(req: PageableRequest, opts?: { trx?: Knex.Transaction }): Promise<PageableResponse<T>> {
    const qb = this.query(opts?.trx);
    if (req.columns?.length) qb.select(...req.columns);
    if (req.page && req.limit) qb.limit(req.limit).offset((req.page - 1) * req.limit);
    if (req.sort) buildSorter(qb, req.sort);
    if (req.keywords) buildKeyword(qb, req.keywords);
    if (req.where) buildQuery(qb, req.where);
    if (!toBool(req.includeDeleted, false)) {
      await excludeDeleted(qb, this.table, this.inspector);
    }

    const [data, total] = await Promise.all([await this.mysqlService.exec(qb), this.count(req)]);
    return { total, data: data.map(this.mapper.toDomain) };
  }

  async count(req: PageableRequest, opts?: { trx?: Knex.Transaction }): Promise<number> {
    const qb = this.query(opts?.trx).count({ count: '*' });
    if (req.keywords) buildKeyword(qb, req.keywords);
    if (req.where) buildQuery(qb, req.where);
    if (!toBool(req.includeDeleted, false)) {
      await excludeDeleted(qb, this.table, this.inspector);
    }

    const res = (await this.mysqlService.exec(qb)) as any;
    return res[0].count;
  }

  async findOne(id: ID, opts?: { trx?: Knex.Transaction; fields?: Array<string> }): Promise<T | null> {
    const primaryColumn = await this.getPrimaryColumn();
    const qb = this.query(opts?.trx).where(primaryColumn.name, '=', id).first();
    if (opts?.fields?.length) qb.select(...opts?.fields);

    const res = await this.mysqlService.exec(qb);
    return isDeleted(res) ? null : this.mapper.toDomain(res);
  }

  async findMany(ids: ID[], opts?: { trx?: Knex.Transaction; fields?: Array<string> }): Promise<T[]> {
    const primaryColumn = await this.getPrimaryColumn();
    const qb = this.query(opts?.trx).whereIn(primaryColumn.name, ids);
    if (opts?.fields?.length) qb.select(...opts?.fields);
    await excludeDeleted(qb, this.table, this.inspector);

    const res = await this.mysqlService.exec(qb);
    return res.map(this.mapper.toDomain);
  }

  async raw<T extends {} = any>(sql: string, bindings: RawBinding): Promise<T[]> {
    return this.mysqlService.execRaw(sql, bindings, this.conId);
  }
}
