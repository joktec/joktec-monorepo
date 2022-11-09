import { MysqlRepoClient } from '../mysql.client';
import { MysqlService } from '../mysql.service';
import { MysqlMapper, PageableRequest, PageableResponse } from '../models';
import { buildQuery } from '../mysql.utils';
import { BaseEntity } from '../entities';

export abstract class MysqlRepo<T extends BaseEntity, ID> implements MysqlRepoClient<T, ID> {
  protected constructor(
    protected table: string,
    protected mysqlService: MysqlService,
    protected mapper: MysqlMapper<T>,
    protected conId?: string,
  ) {}

  protected getTable() {
    return this.mysqlService.qb(this.table, this.conId);
  }

  async findAll(req: PageableRequest): Promise<PageableResponse<T>> {
    const qb = this.getTable();

    if (req.columns?.length) qb.select(...req.columns);
    if (req.page && req.limit) qb.limit(req.limit).offset(req.page * req.limit);
    if (req.sort) Object.keys(req.sort || {}).map(key => qb.orderBy(key, req.sort[key]));
    if (req.where) qb.where(builder => buildQuery(builder, req.where));

    const [data, total] = await Promise.all([await this.mysqlService.exec(qb), this.count(req)]);
    return {
      total,
      data: data.map(this.mapper.toDomain),
    };
  }

  async count(req: PageableRequest): Promise<number> {
    const qb = this.getTable().count({ count: '*' });
    if (req.where) {
      qb.where(builder => buildQuery(builder, req.where));
    }
    const res = (await this.mysqlService.exec(qb)) as any;
    return res.count;
  }

  async insert(entity: T): Promise<void> {
    const qb = this.getTable().insert(this.mapper.toPersistence(entity));
    await this.mysqlService.exec(qb);
  }

  async update(entity: T): Promise<void> {
    const updatedValues: any = this.mapper.toPersistence(entity);
    const id: ID = updatedValues.id;
    delete updatedValues.id;
    const qb = this.getTable().where('id', '=', id).update(updatedValues);
    await this.mysqlService.exec(qb);
  }

  async findOne(id: ID, fields?: Array<string>): Promise<T> {
    const qb = this.getTable().where('id', '=', id).first();
    if (fields?.length) qb.select(...fields);
    const res = await this.mysqlService.exec(qb);
    return this.mapper.toDomain(res);
  }

  async delete(entity: T): Promise<void> {
    const model: any = this.mapper.toPersistence(entity);
    const qb = this.getTable().where('id', '=', model.id).del();
    await this.mysqlService.exec(qb);
  }
}
