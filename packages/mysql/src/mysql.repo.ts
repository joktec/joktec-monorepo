import {
  ConfigService,
  DeepPartial,
  DEFAULT_CON_ID,
  ICondition,
  Inject,
  Injectable,
  LogService,
  OnModuleInit,
  toArray,
  toBool,
} from '@joktec/core';
import { OnApplicationBootstrap } from '@nestjs/common';
import { FindOptions, RestoreOptions } from 'sequelize';
import { DestroyOptions } from 'sequelize/types/model';
import { Model, ModelCtor, Repository } from 'sequelize-typescript';
import { MysqlHelper } from './helpers';
import { IMysqlRequest, IMysqlResponse, MysqlId, MysqlModel } from './models';
import { IMysqlRepository } from './mysql.client';
import { MysqlCatch } from './mysql.exception';
import { MysqlService } from './mysql.service';

@Injectable()
export abstract class MysqlRepo<T extends MysqlModel<T>, ID = MysqlId>
  implements IMysqlRepository<T, ID>, OnModuleInit, OnApplicationBootstrap
{
  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;

  protected constructor(
    protected mysqlService: MysqlService,
    protected model: ModelCtor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  async onModuleInit() {
    this.logService.setContext(this.constructor.name);
  }

  onApplicationBootstrap() {
    this.model = this.mysqlService.getModel(this.model, this.conId);
  }

  get repository(): Repository<T> {
    return this.mysqlService.getRepository(this.model, this.conId);
  }

  @MysqlCatch
  async find(query: IMysqlRequest<T>): Promise<T[]> {
    const options: FindOptions<T> = MysqlHelper.parseFilter(query);
    if (query.select) options.attributes = toArray(query.select, { split: ',' });
    if (query.sort) options.order = Object.entries(query.sort);
    if (query.limit) options.limit = query.limit;
    if (query.limit && query.page) {
      options.limit = query.limit;
      options.offset = (query.page - 1) * query.limit;
    }
    return this.model.findAll(options);
  }

  @MysqlCatch
  async count(query: IMysqlRequest<T>): Promise<number> {
    const options: FindOptions = MysqlHelper.parseFilter(query);
    return this.model.count(options);
  }

  @MysqlCatch
  async paginate(query: IMysqlRequest<T>): Promise<IMysqlResponse<T>> {
    const [items, total] = await Promise.all([this.find(query), this.count(query)]);
    return { items, total };
  }

  @MysqlCatch
  async findOne(query: IMysqlRequest<T>): Promise<T> {
    const options: FindOptions = MysqlHelper.parseFilter(query);
    if (query.select) options.attributes = toArray(query.select, { split: ',' });
    return this.model.findOne(options);
  }

  @MysqlCatch
  async findById(id: ID, query: IMysqlRequest<T>): Promise<T> {
    query.condition = { [this.model.primaryKeyAttribute]: id } as any;
    const options: FindOptions = MysqlHelper.parseFilter(query);
    if (query.select) options.attributes = toArray(query.select, { split: ',' });
    return this.model.findOne(options);
  }

  @MysqlCatch
  async create(body: Model<T>): Promise<T> {
    return this.model.build(body as any, { isNewRecord: true }).save();
  }

  @MysqlCatch
  async update(condition: ICondition<T>, body: DeepPartial<T>): Promise<T> {
    const options: FindOptions = MysqlHelper.parseFilter({ condition });
    const model: T = await this.model.findOne(options);
    if (!model) return null;
    const fields: any[] = Object.keys(body);
    return model.update(body as T, { fields });
  }

  @MysqlCatch
  async delete(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T> {
    const existModel = await this.findOne({ condition });
    if (!existModel) return null;

    const options: DestroyOptions<T> = MysqlHelper.parseFilter({ condition });
    options.force = toBool(opts?.force, false);
    await this.model.destroy(options);
    return existModel;
  }

  @MysqlCatch
  async restore(condition: ICondition<T>, opts?: { userId?: ID }): Promise<T> {
    const options: RestoreOptions<T> = MysqlHelper.parseFilter({ condition });
    await this.model.restore(options);
    if (!opts?.userId) {
      return this.findOne({ condition });
    }
    return this.update(condition, { updatedAt: opts?.userId });
  }

  @MysqlCatch
  async upsert(body: DeepPartial<T>, onConflicts: (keyof T)[]): Promise<T> {
    const fields: any[] = Object.keys(body);
    const [row, result] = await this.model.upsert(body as any, {
      returning: true,
      fields,
      conflictFields: onConflicts,
    });
    if (!row || !result) return null;
    return row;
  }
}
