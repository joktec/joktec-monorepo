import {
  ConfigService,
  DeepPartial,
  DEFAULT_CON_ID,
  ICondition,
  Inject,
  Injectable,
  LogService,
  OnModuleInit,
  plainToInstance,
  toArray,
  Reflector,
} from '@joktec/core';
import { Ref } from '@typegoose/typegoose';
import { isArray, isNil, omit, pick } from 'lodash';
import { Aggregate, RefType, UpdateQuery } from 'mongoose';
import { MongoHelper, MongoPipeline, UPDATE_OPTIONS, UPSERT_OPTIONS } from './helpers';
import {
  IMongoAggregateOptions,
  IMongoBulkOptions,
  IMongoOptions,
  IMongoPaginationResponse,
  IMongoPipeline,
  IMongoRequest,
  MongoSchema,
  ObjectId,
} from './models';
import { IMongoRepository, MongoType } from './mongo.client';
import { MongoCatch } from './mongo.exception';
import { MongoService } from './mongo.service';

@Injectable()
export abstract class MongoRepo<T extends MongoSchema, ID extends RefType = string>
  implements IMongoRepository<T, ID>, OnModuleInit
{
  @Inject() protected reflector: Reflector;
  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;

  protected constructor(
    protected mongoService: MongoService,
    protected schema: typeof MongoSchema,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  async onModuleInit() {
    this.logService.setContext(this.constructor.name);
  }

  protected get model(): MongoType<T> {
    return this.mongoService.getModel(this.schema);
  }

  protected transform(docs: any | any[]): T | T[] {
    if (isNil(docs)) return null;
    if (isArray(docs) && !docs.length) return [];
    const transformDocs = plainToInstance(this.schema, toArray(docs));
    return (isArray(docs) ? transformDocs : transformDocs[0]) as any;
  }

  public qb(query?: IMongoRequest<T>, options: IMongoOptions<T> = {}) {
    const qb = this.model.find<T>();
    qb.setOptions({ ...options });

    if (query?.near) qb.center(query.near);
    if (query?.keyword) qb.search(query.keyword);
    qb.where(Object.assign({}, query?.condition || {}));
    if (query?.select) qb.select(query.select as any);
    if (query?.sort) qb.sort(MongoHelper.parseSort(query.sort));
    if (query?.offset) qb.skip(query.offset);
    if (query?.limit) qb.limit(query.limit);
    if (query?.populate) qb.populate(MongoHelper.parsePopulate(query.populate));

    return qb.lean();
  }

  public pipeline<U = T>(query?: IMongoRequest<T>, options?: IMongoAggregateOptions<U>): Aggregate<Array<U>> {
    const aggregations = this.model.aggregate();

    if (options) aggregations.option({ ...options });
    if (query?.near) MongoPipeline.near(query.near).map(near => aggregations.near(near));
    if (query?.keyword) aggregations.match(MongoPipeline.search(query.keyword));
    if (query?.condition) aggregations.match(MongoPipeline.match(query.condition));
    if (query?.select) aggregations.project(MongoPipeline.projection(query.select));
    if (query?.sort) aggregations.sort(MongoPipeline.sort(query.sort));
    if (query?.offset) aggregations.skip(query.offset);
    if (query?.limit) aggregations.limit(query.limit);
    if (query?.populate) MongoPipeline.lookup(query.populate, this.model).map(p => aggregations.append(p));
    if (query?.aggregations?.length) aggregations.append(...query.aggregations);

    return aggregations;
  }

  @MongoCatch
  async paginate(query: IMongoRequest<T>, options: IMongoOptions<T> = {}): Promise<IMongoPaginationResponse<T>> {
    const findQuery: IMongoRequest<T> = { ...query };
    const countQuery: IMongoRequest<T> = omit(query, ['select', 'page', 'limit', 'offset', 'sort']);
    const [items, total] = await Promise.all([this.find(findQuery, options), this.count(countQuery, options)]);
    return { items, total };
  }

  @MongoCatch
  async find(query: IMongoRequest<T>, options: IMongoOptions<T> = {}): Promise<T[]> {
    const docs = await this.qb(query, options).find().exec();
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async count(query: IMongoRequest<T>, options: IMongoOptions<T> = {}): Promise<number> {
    const processQuery = omit(query, ['select', 'page', 'limit', 'offset', 'sort']);
    const qb = this.qb(processQuery, options);
    return query.near ? qb.estimatedDocumentCount() : qb.countDocuments();
  }

  @MongoCatch
  async findOne(
    cond: ID | ObjectId | Ref<T, ID> | ICondition<T>,
    query: Omit<IMongoRequest<T>, 'condition'> = {},
    options: IMongoOptions<T> = {},
  ): Promise<T> {
    const condition: ICondition<T> = {};
    if (ObjectId.isValid(String(cond))) Object.assign(condition, { _id: ObjectId.create(String(cond)) });
    else Object.assign(condition, cond);

    const mergeQuery = Object.assign({}, query, { condition });
    const doc = await this.qb(mergeQuery, options).findOne().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async create(body: DeepPartial<T> & UpdateQuery<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const doc = await this.model.create(transformBody);
    return this.findOne({ condition: { _id: String(doc._id) } } as any, options);
  }

  @MongoCatch
  async update(
    cond: ID | ObjectId | Ref<T, ID> | ICondition<T>,
    body: DeepPartial<T> & UpdateQuery<T>,
    options: IMongoOptions<T> = {},
  ): Promise<T> {
    const condition: ICondition<T> = {};
    if (ObjectId.isValid(String(cond))) Object.assign(condition, { _id: ObjectId.create(String(cond)) });
    else Object.assign(condition, cond);

    const transformBody: T = this.transform(body) as T;
    const _options = Object.assign({}, UPDATE_OPTIONS, options);
    const doc = await this.qb({ condition }, _options).findOneAndUpdate(transformBody).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async delete(cond: ID | ObjectId | Ref<T, ID> | ICondition<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const condition: ICondition<T> = {};
    if (ObjectId.isValid(String(cond))) Object.assign(condition, { _id: ObjectId.create(String(cond)) });
    else Object.assign(condition, cond);

    const doc = await this.qb().destroyOne(condition, options).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async deleteMany(cond: ICondition<T>, options: IMongoOptions<T> = {}): Promise<T[]> {
    const docs = await this.qb({ condition: cond }).exec();
    await this.model.destroyMany(cond, options).exec();
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async restore(cond: ID | ObjectId | Ref<T, ID> | ICondition<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const condition: ICondition<T> = {};
    if (ObjectId.isValid(String(cond))) Object.assign(condition, { _id: ObjectId.create(String(cond)) });
    else Object.assign(condition, cond);

    const doc = await this.qb().restore(condition, options).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async upsert(body: DeepPartial<T>, onConflicts: (keyof T)[] = ['_id'], options: IMongoOptions<T> = {}): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const condition: ICondition<T> = pick(body, onConflicts) as ICondition<T>;
    const _options = Object.assign({}, UPSERT_OPTIONS, options);
    const doc = await this.qb({ condition }, _options).findOneAndUpdate(transformBody).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async bulkUpsert(
    docs: DeepPartial<T>[],
    onConflicts: (keyof T)[] = ['_id'],
    options: IMongoBulkOptions = {},
  ): Promise<any> {
    const transformBody: T[] = this.transform(docs) as T[];
    const bulkDocs: any[] = transformBody.map((doc: T) => {
      return { updateOne: { filter: pick(doc, onConflicts), update: { $set: doc }, upsert: true } };
    });
    return this.model.bulkWrite(bulkDocs, options);
  }

  @MongoCatch
  async aggregate<U = T>(pipeline: IMongoPipeline[], options: IMongoAggregateOptions<U> = {}): Promise<U[]> {
    const { autoTransform = true, transformFn } = options;
    const docs: any[] = await this.model.aggregate(pipeline, options).exec();
    if (transformFn) return options.transformFn(docs);
    if (autoTransform) return this.transform(docs) as any[];
    return docs;
  }
}
