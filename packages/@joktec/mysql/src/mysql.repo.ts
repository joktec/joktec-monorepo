import { DEFAULT_CON_ID, ICondition, toBool } from '@joktec/core';
import { IMysqlRepository } from './mysql.client';
import { MysqlService } from './mysql.service';
import { Model, ModelCtor } from 'sequelize-typescript';
import { FindOptions } from 'sequelize';
import { IMysqlRequest, IMysqlResponse, MysqlId } from './models';
import { preHandleQuery } from './mysql.utils';
import { DestroyOptions } from 'sequelize/types/model';

export abstract class MysqlRepo<T extends Model<T>, ID = MysqlId> implements IMysqlRepository<T, ID> {
  protected constructor(
    protected mysqlService: MysqlService,
    protected model: ModelCtor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  async pageable(query: IMysqlRequest): Promise<IMysqlResponse<T>> {
    const [items, totalItems] = await Promise.all([this.find(query), this.count(query)]);
    return {
      items,
      totalItems,
      page: query.page,
      pageSize: query.limit,
      totalPage: Math.ceil(totalItems / query.limit),
      isLastPage: items.length < query.limit,
    };
  }

  async find(query: IMysqlRequest): Promise<T[]> {
    const options: FindOptions = preHandleQuery(query.condition, query.keyword);
    if (query.select) options.attributes = query.select;
    if (query.sort) options.order = Object.entries(query.sort);
    if (query.limit && query.page) {
      options.limit = query.limit;
      options.offset = (query.page - 1) * query.limit;
    }
    return this.mysqlService.getModel(this.model).findAll(options);
  }

  async count(query: IMysqlRequest): Promise<number> {
    const options: FindOptions = preHandleQuery(query.condition, query.keyword);
    return this.mysqlService.getModel(this.model).count(options);
  }

  async findOne(query: IMysqlRequest): Promise<T> {
    const options: FindOptions = preHandleQuery(query.condition, query.keyword);
    if (query.select) options.attributes = query.select;
    return this.mysqlService.getModel(this.model).findOne(options);
  }

  async create(body: T): Promise<T> {
    return this.mysqlService.getModel(this.model).create(body as any);
  }

  async update(condition: ICondition, body: T): Promise<T> {
    const options: FindOptions = preHandleQuery(condition);
    const model: T = await this.mysqlService.getModel(this.model).findOne(options);
    if (!model) return null;
    const fields: any[] = Object.keys(body);
    return model.update(body, { fields });
  }

  async delete(condition: ICondition, opts?: { force?: boolean }): Promise<number> {
    const options: DestroyOptions = preHandleQuery(condition);
    options.force = toBool(opts?.force, true);
    return this.mysqlService.getModel(this.model).destroy(options);
  }

  async upsert(condition: ICondition, body: T): Promise<T> {
    const options: FindOptions = preHandleQuery(condition);
    const fields: any[] = Object.keys(body);
    const pk: any = this.mysqlService.getModel(this.model).primaryKeyAttribute;
    const [row, result] = await this.mysqlService
      .getModel(this.model)
      .upsert(body as any, { returning: true, fields, conflictFields: [pk] });
    if (!row || !result) return null;
    return row;
  }
}
