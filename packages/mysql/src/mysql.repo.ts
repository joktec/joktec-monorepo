import {
  ConfigService,
  Constructor,
  DEFAULT_CON_ID,
  ICondition,
  Inject,
  Injectable,
  KeyOf,
  LogService,
  OnApplicationBootstrap,
  OnModuleInit,
  plainToInstance,
  toArray,
} from '@joktec/core';
import { isArray, isNil, isObject, omit } from 'lodash';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';
import { MysqlHelper } from './helpers';
import { IMysqlOption, IMysqlRequest, IMysqlResponse, MysqlId, MysqlModel } from './models';
import { IMysqlRepository } from './mysql.client';
import { MysqlCatch } from './mysql.exception';
import { MysqlService } from './mysql.service';

@Injectable()
export abstract class MysqlRepo<T extends MysqlModel, ID extends MysqlId = MysqlId>
  implements IMysqlRepository<T, ID>, OnModuleInit, OnApplicationBootstrap
{
  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;

  protected constructor(
    protected mysqlService: MysqlService,
    protected model: Constructor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  async onModuleInit() {
    this.logService.setContext(this.constructor.name);
  }

  onApplicationBootstrap() {}

  get repository(): Repository<T> {
    return this.mysqlService.getRepository(this.model, this.conId);
  }

  protected transform(docs: any | any[]): T | T[] {
    if (isNil(docs)) return null;
    if (isArray(docs) && !docs.length) return [];
    const transformDocs = plainToInstance(this.model, toArray(docs));
    return (isArray(docs) ? transformDocs : transformDocs[0]) as any;
  }

  public qb(query: IMysqlRequest<T> = {}, opts: IMysqlOption<T> = {}): FindManyOptions<T> {
    const options: FindManyOptions<T> = MysqlHelper.parseFilter(query);
    // if (query?.near) qb.center(query.near); // TODO: Handle
    // if (query?.keyword) qb.search(query.keyword); // TODO: Handle
    if (query.select) options.select = MysqlHelper.parseProjection(query.select);
    if (query.sort) options.order = MysqlHelper.parseOrder(query.sort);
    if (query.limit) options.take = query.limit;
    if (query.limit && query.page) {
      options.take = query.limit;
      options.skip = (query.page - 1) * query.limit;
    }
    if (query.populate) options.relations = MysqlHelper.parseRelations(query.populate);
    return { ...opts, ...options };
  }

  private whereById(pkValue: ID): FindManyOptions<T>['where'] {
    const primaryColumns = this.repository.metadata.primaryColumns.map(pk => pk.propertyName);
    return primaryColumns.reduce((curr, acc) => {
      curr[acc] = pkValue;
      return curr;
    }, {});
  }

  @MysqlCatch
  async paginate(query: IMysqlRequest<T>, opts: IMysqlOption<T> = {}): Promise<IMysqlResponse<T>> {
    const findQuery: IMysqlRequest<T> = { ...query };
    const countQuery: IMysqlRequest<T> = omit(query, ['select', 'page', 'limit', 'offset', 'sort']);
    const [items, total] = await Promise.all([this.find(findQuery, opts), this.count(countQuery, opts)]);
    return { items, total };
  }

  @MysqlCatch
  async find(query: IMysqlRequest<T>, opts: IMysqlOption<T> = {}): Promise<T[]> {
    const options: FindManyOptions<T> = this.qb(query, opts);
    const docs = await this.repository.find(options);
    return this.transform(docs) as T[];
  }

  @MysqlCatch
  async count(query: IMysqlRequest<T>, opts: IMysqlOption<T> = {}): Promise<number> {
    const options: FindManyOptions<T> = this.qb(query, opts);
    return this.repository.count(options);
  }

  @MysqlCatch
  async findOne(
    cond: ID | ICondition<T>,
    query: Omit<IMysqlRequest<T>, 'condition'> = {},
    opts: IMysqlOption<T> = {},
  ): Promise<T> {
    const condition: ICondition<T> = {};
    if (!isObject(cond)) Object.assign(condition, { ...this.whereById(cond) });
    else Object.assign(condition, cond);

    const mergeQuery: IMysqlRequest<T> = Object.assign({}, query, { condition });
    const options: FindOneOptions<T> = this.qb(mergeQuery, opts);
    const doc = await this.repository.findOne(options);
    return this.transform(doc) as T;
  }

  @MysqlCatch
  async create(body: DeepPartial<T>, opts: IMysqlOption<T> = {}): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const entity = this.repository.create(transformBody);
    return this.repository.save(entity, opts);
  }

  @MysqlCatch
  async update(cond: ID | ICondition<T>, body: DeepPartial<T>, options: IMysqlOption<T> = {}): Promise<T> {
    const condition: ICondition<T> = {};
    if (!isObject(cond)) Object.assign(condition, { ...this.whereById(cond) });
    else Object.assign(condition, cond);

    const entity = await this.findOne(condition, options);
    if (!entity) return null;

    const transformBody: T = this.transform({ ...entity, ...body }) as T;
    const doc = await this.repository.save(transformBody, options);
    return this.transform(doc) as T;
  }

  @MysqlCatch
  async delete(cond: ID | ICondition<T>, opts: IMysqlOption<T> & { force?: boolean } = {}): Promise<T> {
    const entity = await this.findOne(cond, opts);
    if (!entity) return null;
    const func: Function = opts?.force ? this.repository.remove : this.repository.softRemove;
    const doc = await func(entity);
    return this.transform(doc) as T;
  }

  @MysqlCatch
  async restore(cond: ID | ICondition<T>, opts: IMysqlOption<T> & { reload?: false } = {}): Promise<T> {
    const entity = await this.findOne(cond, opts);
    if (!entity) return null;
    const doc = await this.repository.recover(entity);
    return this.transform(doc) as T;
  }

  @MysqlCatch
  async upsert(
    body: DeepPartial<T>,
    onConflicts: KeyOf<T>[],
    opts: IMysqlOption<T> & Omit<UpsertOptions<T>, 'conflictPaths'> = {},
  ): Promise<T> {
    const transformBody: any = this.repository.create(body);
    const result = await this.repository.upsert(transformBody, { ...opts, conflictPaths: onConflicts });
    return this.transform(result.generatedMaps[0]) as T;
  }

  @MysqlCatch
  async bulkUpsert(
    body: DeepPartial<T>[],
    onConflicts: KeyOf<T>[],
    opts: IMysqlOption<T> & Omit<UpsertOptions<T>, 'conflictPaths'> = {},
  ): Promise<T[]> {
    const transformBody: any = this.repository.create(body);
    const result = await this.repository.upsert(transformBody, { ...opts, conflictPaths: onConflicts });
    return this.transform(result.generatedMaps) as T[];
  }
}
