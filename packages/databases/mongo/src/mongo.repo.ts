import {
  ConfigService,
  DEFAULT_CON_ID,
  ICondition,
  Inject,
  Injectable,
  KeyOf,
  LogService,
  OnModuleInit,
  Reflector,
} from '@joktec/core';
import { plainToInstance, toArray, toInt } from '@joktec/utils';
import { Ref } from '@typegoose/typegoose';
import { chunk, isArray, isNil, omit, pick } from 'lodash';
import { Aggregate, AnyBulkWriteOperation, RefType } from 'mongoose';
import { MongoHelper, MongoPipeline, UPDATE_OPTIONS, UPSERT_OPTIONS } from './helpers';
import {
  IMongoAggregateOptions,
  IMongoBulkOptions,
  IMongoOptions,
  IMongoPaginationResponse,
  IMongoPipeline,
  IMongoRequest,
  IMongoUpdate,
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
    const { limit, offset } = MongoHelper.parsePagination(query);

    if (query?.near) qb.center(query.near);
    if (query?.keyword) qb.search(query.keyword);
    qb.where(Object.assign({}, query?.condition || {}));
    if (query?.select) qb.select(query.select as any);
    if (query?.sort) qb.sort(MongoHelper.parseSort(query.sort));
    if (offset !== undefined) qb.skip(offset);
    if (limit !== undefined) qb.limit(limit);
    if (query?.populate) qb.populate(MongoHelper.parsePopulate(query.populate));

    return qb.lean();
  }

  public cursor(query: IMongoRequest<T>, options: IMongoOptions<T> = {}) {
    const qb = this.model.find<T>();
    qb.setOptions({ ...options });
    const { limit, offset } = MongoHelper.parsePagination(query);

    if (query?.near) qb.center(query.near);
    if (query?.keyword) qb.search(query.keyword);
    if (query?.condition) qb.where(MongoHelper.parseFilter(query.condition));
    if (query?.select) qb.select(MongoHelper.parseProjection(query.select));
    if (query?.sort) qb.sort(MongoHelper.parseSort(query.sort));
    if (offset !== undefined) qb.skip(offset);
    if (limit !== undefined) qb.limit(limit);
    if (query?.populate) qb.populate(MongoHelper.parsePopulate(query.populate));

    return qb.lean().cursor();
  }

  public pipeline<U = T>(query?: IMongoRequest<T>, options?: IMongoAggregateOptions<U>): Aggregate<Array<U>> {
    const aggregations = this.model.aggregate();
    const { limit, offset } = MongoHelper.parsePagination(query);

    if (options) aggregations.option({ ...options });
    if (query?.near) MongoPipeline.near(query.near).map(near => aggregations.near(near));
    if (query?.keyword) aggregations.match(MongoPipeline.search(query.keyword));
    if (query?.condition) aggregations.match(MongoPipeline.match(query.condition));
    if (query?.select) aggregations.project(MongoPipeline.projection(query.select));
    if (query?.sort) aggregations.sort(MongoPipeline.sort(query.sort));
    if (offset !== undefined) aggregations.skip(offset);
    if (limit !== undefined) aggregations.limit(limit);
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
    const condition: ICondition<T> = MongoHelper.parseSimpleCondition(cond);
    const mergeQuery = Object.assign({}, query, { condition });
    const doc = await this.qb(mergeQuery, options).findOne().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async create(body: IMongoUpdate<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const doc = await this.model.create(transformBody);
    return this.findOne(doc._id as ID, options);
  }

  @MongoCatch
  async update(
    cond: ID | ObjectId | Ref<T, ID> | ICondition<T>,
    body: IMongoUpdate<T>,
    options: IMongoOptions<T> = {},
  ): Promise<T> {
    const condition: ICondition<T> = MongoHelper.parseSimpleCondition(cond);
    const transformBody: T = this.transform(body) as T;
    const _options = Object.assign({}, UPDATE_OPTIONS, options);
    const doc = await this.qb({ condition }, _options).findOneAndUpdate(transformBody).exec();
    return this.transform(doc) as T;
  }

  async updateMany(condition: ICondition<T>, body: IMongoUpdate<T>, options: IMongoOptions<T> = {}): Promise<T[]> {
    const transformBody: T = this.transform(body) as T;
    const _options = Object.assign({}, UPDATE_OPTIONS, options);
    await this.qb({ condition }, _options).updateMany(transformBody).exec();
    return this.find({ condition });
  }

  @MongoCatch
  async delete(cond: ID | ObjectId | Ref<T, ID> | ICondition<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const condition: ICondition<T> = MongoHelper.parseSimpleCondition(cond);
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
    const condition: ICondition<T> = MongoHelper.parseSimpleCondition(cond);
    const doc = await this.qb().restore(condition, options).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async upsert(body: IMongoUpdate<T>, onConflicts?: KeyOf<T>[], options: IMongoOptions<T> = {}): Promise<T> {
    const fields = onConflicts?.length ? onConflicts : ['_id'];
    const transformBody: T = this.transform(body) as T;
    const condition: ICondition<T> = pick(body, fields) as ICondition<T>;
    const _options = Object.assign({}, UPSERT_OPTIONS, options);
    const doc = await this.qb({ condition }, _options).findOneAndUpdate(transformBody).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async bulkUpsert(docs: IMongoUpdate<T>[], onConflicts?: KeyOf<T>[], options: IMongoBulkOptions = {}): Promise<T[]> {
    const fields = onConflicts?.length ? onConflicts : ['_id'];
    const transformBody: T[] = this.transform(docs) as T[];

    const chunkSize = toInt(options?.chunkSize, 1000);
    const chunkItems = chunk(transformBody, chunkSize);
    const results: T[][] = [];

    for (const chunkItem of chunkItems) {
      const bulkDocs: AnyBulkWriteOperation[] = chunkItem.map((doc: T) => {
        const updateDoc: IMongoUpdate<any> = {};
        Object.keys(doc).forEach(key => {
          if (!key.startsWith('$')) {
            if (!updateDoc.$set) updateDoc.$set = {};
            updateDoc.$set[key] = doc[key];
          }
        });
        return { updateOne: { filter: pick(doc, fields), update: updateDoc, upsert: true } };
      });
      const result = await this.model.bulkWrite(bulkDocs, options);
      const newIds = [...Object.values(result.upsertedIds), ...Object.values(result.insertedIds)];
      const newItems = await this.find({ condition: { _id: { $in: newIds } } as any });
      results.push(newItems);
    }

    return results.flat();
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
