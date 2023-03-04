import { DEFAULT_CON_ID, ICondition, OnModuleInit, toArray, toBool } from '@joktec/core';
import { IMysqlRepository } from './mysql.client';
import { MysqlService } from './mysql.service';
import { Model, ModelCtor } from 'sequelize-typescript';
import { FindOptions } from 'sequelize';
import { IMysqlRequest, MysqlId } from './models';
import { preHandleQuery } from './mysql.utils';
import { DestroyOptions } from 'sequelize/types/model';
import { MysqlCatch } from './mysql.exception';

export abstract class MysqlRepo<T extends Model<T>, ID = MysqlId> implements IMysqlRepository<T, ID>, OnModuleInit {
  protected constructor(
    protected mysqlService: MysqlService,
    protected model: ModelCtor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  async onModuleInit() {
    await this.mysqlService.getModelSync(this.model, this.conId);
  }

  @MysqlCatch
  async find(query: IMysqlRequest): Promise<T[]> {
    const options: FindOptions = preHandleQuery(query.condition, query.keyword);
    if (query.select) options.attributes = toArray<string>(query.select, ',');
    if (query.sort) options.order = Object.entries(query.sort);
    if (query.limit && query.page) {
      options.limit = query.limit;
      options.offset = (query.page - 1) * query.limit;
    }
    return this.model.findAll(options);
  }

  @MysqlCatch
  async count(query: IMysqlRequest): Promise<number> {
    const options: FindOptions = preHandleQuery(query.condition, query.keyword);
    return this.model.count(options);
  }

  @MysqlCatch
  async findOne(query: IMysqlRequest): Promise<T> {
    const options: FindOptions = preHandleQuery(query.condition, query.keyword);
    if (query.select) options.attributes = toArray<string>(query.select, ',');
    return this.model.findOne(options);
  }

  @MysqlCatch
  async create(body: T): Promise<T> {
    return this.model.create(body as any);
  }

  @MysqlCatch
  async update(condition: ICondition, body: T): Promise<T> {
    const options: FindOptions = preHandleQuery(condition);
    const model: T = await this.model.findOne(options);
    if (!model) return null;
    const fields: any[] = Object.keys(body);
    return model.update(body, { fields });
  }

  @MysqlCatch
  async delete(condition: ICondition, opts?: { force?: boolean }): Promise<T> {
    const existModel = await this.findOne({ condition });
    if (!existModel) return null;

    const options: DestroyOptions = preHandleQuery(condition);
    options.force = toBool(opts?.force, false);
    await this.model.destroy(options);
    return existModel;
  }

  @MysqlCatch
  async upsert(condition: ICondition, body: T): Promise<T> {
    const fields: any[] = Object.keys(body);
    const pk: any = this.model.primaryKeyAttribute;
    const [row, result] = await this.model.upsert(body as any, { returning: true, fields, conflictFields: [pk] });
    if (!row || !result) return null;
    return row;
  }
}
