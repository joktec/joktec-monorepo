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
  DELETE_OPTIONS,
  preHandleBody,
  preHandleQuery,
  preHandleUpdateBody,
  UPDATE_OPTIONS,
  UPSERT_OPTIONS,
} from './mongo.utils';
import { Reflector } from '@nestjs/core';
import { ISchemaOptions } from './decorators';

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

  private get schemeOptions(): ISchemaOptions {
    return this.reflector.get<ISchemaOptions>(this.schema.name, this.schema);
  }

  private get paranoid(): boolean {
    return toBool(this.schemeOptions.paranoid, true);
  }

  @MongoCatch
  async find(query: IMongoRequest<T>): Promise<T[]> {
    if (query.aggregations?.length) {
      const aggregations = buildAggregation(query, this.paranoid);
      const docs = await this.model.aggregate(aggregations).exec();
      return this.transform(docs) as T[];
    }

    const condition: ICondition<T> = preHandleQuery(query, this.paranoid);
    const qb = this.model.find(condition);
    if (query.select) qb.select(buildProjection(query.select));
    if (query.sort) qb.sort(buildSorter(query.sort));
    if (query.limit && query.page) qb.limit(query.limit).skip((query.page - 1) * query.limit);
    if (query.populate) qb.populate(convertPopulate(query.populate, this.paranoid));
    const docs: any[] = await qb.lean().exec();
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async count(query: IMongoRequest<T>): Promise<number> {
    const condition: ICondition<T> = preHandleQuery(query, this.paranoid);
    if (query.near && query.condition.hasOwnProperty(query.near.field || 'location')) {
      return this.model.estimatedDocumentCount(condition);
    }
    return this.model.countDocuments(condition);
  }

  @MongoCatch
  async findOne(query: IMongoRequest<T>): Promise<T> {
    const condition: ICondition<T> = preHandleQuery(query, this.paranoid);
    const qb = this.model.findOne(condition);
    if (query.select) qb.select(buildProjection(query.select));
    if (query.sort) qb.sort(buildSorter(query.sort));
    if (query.populate) qb.populate(convertPopulate(query.populate, this.paranoid));
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
    const overrideCondition: ICondition<T> = preHandleQuery({ condition }, this.paranoid);
    const qb = this.model.findOneAndUpdate(overrideCondition, processBody, UPDATE_OPTIONS);
    const doc = await qb.lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async delete(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T> {
    const force: boolean = toBool(opts?.force, false);
    const overrideCondition: ICondition<T> = preHandleQuery({ condition }, this.paranoid);
    if (!force && this.paranoid) {
      const bodyDeleted = { deletedAt: new Date(), deletedBy: opts?.userId ?? null };
      const doc = await this.model.findOneAndUpdate(overrideCondition, bodyDeleted, UPDATE_OPTIONS).lean().exec();
      return this.transform(doc) as T;
    }
    const doc = await this.model.findOneAndRemove(overrideCondition, DELETE_OPTIONS).lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async deleteMany(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T[]> {
    const force: boolean = toBool(opts?.force, false);
    const overrideCondition: ICondition<T> = preHandleQuery({ condition }, this.paranoid);
    if (!force && this.paranoid) {
      const bodyDeleted = { deletedAt: new Date(), deletedBy: opts?.userId ?? null };
      const docs = await this.model.updateMany(overrideCondition, bodyDeleted, UPDATE_OPTIONS).lean().exec();
      return this.transform(docs) as T[];
    }
    const docs = await this.model.deleteMany(overrideCondition, DELETE_OPTIONS).lean().exec();
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async upsert(condition: ICondition<T>, body: DeepPartial<T>): Promise<T> {
    const overrideCondition: ICondition<T> = preHandleQuery({ condition }, this.paranoid);
    const transformBody: T = this.transform(body) as T;
    const processBody: DeepPartial<T> = preHandleBody<T>(transformBody);

    const res = await this.model.updateOne(overrideCondition, processBody, UPSERT_OPTIONS);
    const doc = await this.model.findById(res.upsertedId).lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async bulkUpsert(docs: T[], upsert?: MongoBulkRequest): Promise<any> {
    const { selectedFields, conditions, operator = 'set' } = upsert ?? {};
    const bulkDocs: any = docs?.map(doc => {
      return {
        updateOne: {
          filter: pick(doc, conditions ?? ['_id']),
          update: { [`$${operator}`]: selectedFields ? pick(doc, selectedFields) : doc },
          upsert: true,
        },
      };
    });
    return this.model.bulkWrite(bulkDocs);
  }
}
