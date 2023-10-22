import {
  ConfigService,
  Constructor,
  DeepPartial,
  DEFAULT_CON_ID,
  ICondition,
  Injectable,
  LogService,
  OnModuleInit,
  plainToInstance,
  toBool,
} from '@joktec/core';
import { Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { isNil, pick } from 'lodash';
import { IMongoAggregation, IMongoRequest, MongoBulkRequest, MongoSchema } from './models';
import { IMongoRepository } from './mongo.client';
import { MongoCatch } from './mongo.exception';
import { MongoService } from './mongo.service';
import {
  buildAggregation,
  buildProjection,
  buildSorter,
  convertPopulate,
  preHandleBody,
  preHandleQuery,
  preHandleUpdateBody,
  UPDATE_OPTIONS,
  UPSERT_OPTIONS,
} from './mongo.utils';

@Injectable()
export abstract class MongoRepo<T extends MongoSchema, ID = string> implements IMongoRepository<T, ID>, OnModuleInit {
  @Inject() protected reflector: Reflector;
  @Inject() protected configService: ConfigService;
  @Inject() protected logService: LogService;
  protected model: ModelType<T> = null;

  protected constructor(
    protected mongoService: MongoService,
    protected schema: Constructor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  onModuleInit() {
    this.logService.setContext(this.constructor.name);
    this.lazyRegister();
  }

  private lazyRegister() {
    if (this.mongoService.isConnected(this.conId)) {
      this.model = this.mongoService.getModel(this.schema, this.conId);
      return;
    }
    setTimeout(this.lazyRegister.bind(this), 1000);
  }

  protected transform(docs: any | any[]): T | T[] {
    if (isNil(docs)) return null;
    return plainToInstance(this.schema, docs);
  }

  @MongoCatch
  async find(query: IMongoRequest<T>): Promise<T[]> {
    if (query.aggregations?.length) {
      const aggregations = buildAggregation(query);
      const docs = await this.model.aggregate(aggregations).exec();
      return this.transform(docs) as T[];
    }

    const condition: ICondition<T> = preHandleQuery(query);
    const qb = this.model.find(condition);
    if (query.select) qb.select(buildProjection(query.select));
    if (query.sort) qb.sort(buildSorter(query.sort));
    if (query.limit && query.page) qb.limit(query.limit).skip((query.page - 1) * query.limit);
    if (query.populate) qb.populate(convertPopulate(query.populate));

    const docs: any[] = await qb.lean().exec();
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async count(query: IMongoRequest<T>): Promise<number> {
    const condition: ICondition<T> = preHandleQuery(query);
    if (query.near && query.condition.hasOwnProperty(query.near.field || 'location')) {
      return this.model.estimatedDocumentCount(condition);
    }
    return this.model.countDocuments(condition);
  }

  @MongoCatch
  async findOne(query: IMongoRequest<T>): Promise<T> {
    const condition: ICondition<T> = preHandleQuery(query);
    const qb = this.model.findOne(condition);
    if (query.select) qb.select(buildProjection(query.select));
    if (query.sort) qb.sort(buildSorter(query.sort));
    if (query.populate) qb.populate(convertPopulate(query.populate));
    const doc = await qb.lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async aggregate<U = T>(aggregations: IMongoAggregation[]): Promise<U[]> {
    const qb = this.model.aggregate(aggregations);
    return qb.exec();
  }

  @MongoCatch
  async create(body: DeepPartial<T>): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const processBody: DeepPartial<T> = preHandleBody<T>(transformBody);
    const doc = await this.model.create(processBody);
    return this.findOne({ condition: { _id: doc._id } });
  }

  @MongoCatch
  async update(condition: ICondition<T>, body: DeepPartial<T>): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const processBody: DeepPartial<T> = preHandleUpdateBody<T>(transformBody);
    const overrideCondition: ICondition<T> = preHandleQuery({ condition });
    const qb = this.model.findOneAndUpdate(overrideCondition, processBody, UPDATE_OPTIONS);
    const doc = await qb.lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async delete(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T> {
    const overrideCondition: ICondition<T> = preHandleQuery({ condition });
    const doc = await this.model.findOneAndDelete(overrideCondition, {
      force: toBool(opts?.force, false),
      deletedBy: opts?.userId,
    });
    return this.transform(doc) as T;
  }

  @MongoCatch
  async deleteMany(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T[]> {
    const overrideCondition: ICondition<T> = preHandleQuery({ condition });
    const docs = await this.model.deleteMany(overrideCondition, {
      force: toBool(opts?.force, false),
      deletedBy: opts?.userId,
    });
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async upsert(condition: ICondition<T>, body: DeepPartial<T>): Promise<T> {
    const overrideCondition: ICondition<T> = preHandleQuery({ condition });
    const transformBody: T = this.transform(body) as T;
    const processBody: DeepPartial<T> = preHandleBody<T>(transformBody);

    const res = await this.model.updateOne(overrideCondition, processBody, UPSERT_OPTIONS);
    const doc = await this.model.findById(res.upsertedId).lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async bulkUpsert(docs: DeepPartial<T>[], upsert: MongoBulkRequest = {}): Promise<any> {
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
    return this.model.bulkWrite(bulkDocs);
  }
}
