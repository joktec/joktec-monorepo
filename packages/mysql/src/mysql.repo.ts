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
import { FindOptions, RestoreOptions } from 'sequelize';
import { DestroyOptions } from 'sequelize/types/model';
import { Model, ModelCtor } from 'sequelize-typescript';
import { MysqlHelper } from './helpers';
import { IMysqlRequest, MysqlId } from './models';
import { IMysqlRepository } from './mysql.client';
import { MysqlCatch } from './mysql.exception';
import { MysqlService } from './mysql.service';

@Injectable()
export abstract class MysqlRepo<T extends Model<T>, ID = MysqlId> implements IMysqlRepository<T, ID>, OnModuleInit {
  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;

  protected constructor(
    protected mysqlService: MysqlService,
    protected model: ModelCtor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  async onModuleInit() {
    this.logService.setContext(this.constructor.name);
    this.mysqlService.getModel(this.model, this.conId);
    await this.model.sync({ alter: { drop: false } });
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
  async findOne(query: IMysqlRequest<T>): Promise<T> {
    const options: FindOptions = MysqlHelper.parseFilter(query);
    if (query.select) options.attributes = toArray(query.select, { split: ',' });
    return this.model.findOne(options);
  }

  @MysqlCatch
  async create(body: Model<T>): Promise<T> {
    return this.model.create(body as any);
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
  async upsert(condition: ICondition<T>, body: DeepPartial<T>): Promise<T> {
    const fields: any[] = Object.keys(body);
    const pk: any = this.model.primaryKeyAttribute;
    const [row, result] = await this.model.upsert(body as any, { returning: true, fields, conflictFields: [pk] });
    if (!row || !result) return null;
    return row;
  }
}
