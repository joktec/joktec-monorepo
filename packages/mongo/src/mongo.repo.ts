import {
  ConfigService,
  DeepPartial,
  DEFAULT_CON_ID,
  Encrypter,
  IBaseRequest,
  ICondition,
  Injectable,
  LogService,
  OnModuleInit,
  plainToInstance,
  toArray,
} from '@joktec/core';
import { Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ReturnModelType } from '@typegoose/typegoose';
import { cloneDeep, head, isArray, isNil, isObject, last, omit, pick } from 'lodash';
import { Aggregate, UpdateQuery } from 'mongoose';
import { MongoHelper, MongoPipeline, QueryHelper, UPDATE_OPTIONS, UPSERT_OPTIONS } from './helpers';
import {
  IMongoAggregateOptions,
  IMongoBulkOptions,
  IMongoBulkRequest,
  IMongoOptions,
  IMongoRequest,
  MongoSchema,
  ObjectId,
} from './models';
import { IMongoRepository } from './mongo.client';
import { MongoCatch } from './mongo.exception';
import { MongoService } from './mongo.service';

@Injectable()
export abstract class MongoRepo<T extends MongoSchema, ID = string> implements IMongoRepository<T, ID>, OnModuleInit {
  @Inject() protected reflector: Reflector;
  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;
  private _model: ReturnModelType<typeof MongoSchema, QueryHelper<T>> = null;
  private readonly encrypter: Encrypter;

  protected constructor(
    protected mongoService: MongoService,
    protected schema: typeof MongoSchema,
    protected conId: string = DEFAULT_CON_ID,
  ) {
    this.encrypter = new Encrypter({ secret: 'IN0OE4V8vBoc0tq8ZrnH5Ejkyr0wyboo', iv: '6HhRTF6XQuTk7aNN' });
  }

  async onModuleInit() {
    this.logService.setContext(this.constructor.name);
    await this.lazyRegister();
  }

  private async lazyRegister() {
    if (this.mongoService.isConnected(this.conId)) {
      this._model = this.mongoService.getModel(this.schema, this.conId);
      await this.mongoService.syncModel(this._model, this.conId);
      return;
    }
    setTimeout(this.lazyRegister.bind(this), 1000);
  }

  protected get model() {
    return this._model;
  }

  protected transform(docs: any | any[]): T | T[] {
    if (isNil(docs)) return null;
    if (isArray(docs) && !docs.length) return [];
    const transformDocs = plainToInstance(this.schema, toArray(docs));
    return (isArray(docs) ? transformDocs : transformDocs[0]) as any;
  }

  protected qb(query?: IMongoRequest<T>, options: IMongoOptions<T> = {}) {
    if (!query?.condition) return this.model.find<T>().lean();

    const qb = this.model.find<T>();
    qb.setOptions({ ...options, language: query?.language || '*' });

    if (query?.near) qb.center(query.near);
    if (query?.keyword) qb.search(query.keyword);
    if (query?.condition) qb.where(query.condition);
    if (query?.select) qb.select(MongoHelper.parseProjection(query.select));
    if (query?.sort) qb.sort(MongoHelper.parseSort(query.sort));
    if (query?.offset) qb.skip(query.offset);
    if (query?.limit) qb.limit(query.limit);
    if (query?.populate) qb.populate(MongoHelper.parsePopulate(query.populate));

    return qb.lean();
  }

  protected pipeline(query?: IMongoRequest<T>, options?: IMongoAggregateOptions): Aggregate<Array<any>> {
    const aggregations = this.model.aggregate();

    if (options) aggregations.option({ ...options, language: query?.language || '*' });
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
  async find(query: IMongoRequest<T>, options: IMongoOptions<T> = {}): Promise<T[]> {
    const docs = await this.qb(query, options).find().exec();
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async count(query: IMongoRequest<T>, options: IMongoOptions<T> = {}): Promise<number> {
    const processQuery = omit(cloneDeep(query), ['select', 'page', 'limit', 'sort']);
    const qb = this.qb(processQuery, options);
    return query.near ? qb.estimatedDocumentCount() : qb.countDocuments();
  }

  @MongoCatch
  async paginate(
    query: IMongoRequest<T>,
    options: IMongoOptions<T> = {},
  ): Promise<{ items: T[]; total: number; prevCursor?: string; currentCursor?: string; nextCursor?: string }> {
    const findQuery: IMongoRequest<T> = omit(cloneDeep(query), ['cursor']);
    const countQuery: IMongoRequest<T> = omit(cloneDeep(query), ['select', 'page', 'limit', 'sort', 'cursor']);

    if (!query.cursor) {
      const [items, total] = await Promise.all([this.find(findQuery, options), this.count(countQuery, options)]);
      return { items, total };
    }

    const lastCursor = isObject(query.cursor) ? query.cursor.lastCursor : query.cursor || '*';
    const cursorField = isObject(query.cursor) ? query.cursor.cursorField : '_id';

    findQuery.sort = Object.assign({ [cursorField]: 1 }, findQuery.sort);
    if (lastCursor && lastCursor !== '*') {
      let decryptedValue: any = this.encrypter.decrypted(lastCursor);
      if (ObjectId.isValid(decryptedValue)) decryptedValue = ObjectId.create(decryptedValue);
      findQuery.condition = Object.assign({ [cursorField]: { $gt: decryptedValue } }, findQuery.condition);
    }

    const [items, total] = await Promise.all([this.find(findQuery, options), this.count(countQuery, options)]);
    return {
      items,
      total,
      prevCursor: lastCursor === '*' ? null : this.encrypter.encrypted(String(head(items)._id)),
      currentCursor: lastCursor,
      nextCursor: items.length < query.limit ? null : this.encrypter.encrypted(String(last(items)._id)),
    };
  }

  @MongoCatch
  async findOne(query: IMongoRequest<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const doc = await this.qb(query, options).findOne().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async findById(id: ID, query: IMongoRequest<T> = {}, options: IMongoOptions<T> = {}): Promise<T> {
    query.condition = { _id: id } as any;
    const doc = await this.qb(query, options).findOne().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async aggregate<U = T>(query: IBaseRequest<T>, options?: IMongoAggregateOptions): Promise<U[]> {
    return this.pipeline(query, options).exec();
  }

  @MongoCatch
  async create(body: DeepPartial<T> & UpdateQuery<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const doc = await this.model.create(transformBody);
    return this.findOne({ condition: { _id: String(doc._id) } } as any, options);
  }

  @MongoCatch
  async update(
    condition: ICondition<T>,
    body: DeepPartial<T> & UpdateQuery<T>,
    options: IMongoOptions<T> = {},
  ): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const _options = Object.assign({}, UPDATE_OPTIONS, options);
    const doc = await this.qb({ condition }, _options).findOneAndUpdate(transformBody).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async delete(condition: ICondition<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const doc = await this.qb().destroyOne(condition, options).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async restore(condition: ICondition<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const doc = await this.qb().restore(condition, options).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async deleteMany(condition: ICondition<T>, options: IMongoOptions<T> = {}): Promise<T[]> {
    const docs = await this.qb({ condition }).exec();
    await this.model.destroyMany(condition, options).exec();
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async upsert(condition: ICondition<T>, body: DeepPartial<T>, options: IMongoOptions<T> = {}): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const _options = Object.assign({}, UPSERT_OPTIONS, options);
    const doc = await this.qb({ condition }, _options).findOneAndUpdate(transformBody).exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async bulkUpsert(
    docs: DeepPartial<T>[],
    upsert: IMongoBulkRequest = {},
    options: IMongoBulkOptions = {},
  ): Promise<any> {
    const { conditions = ['_id'], fields, operator = '$set' } = upsert;
    const bulkDocs: any[] = docs?.map(doc => {
      return {
        updateOne: {
          filter: pick(doc, conditions),
          update: { [operator]: fields?.length ? pick(doc, fields) : doc },
          upsert: true,
        },
      };
    });
    return this.model.bulkWrite(bulkDocs, options);
  }
}
