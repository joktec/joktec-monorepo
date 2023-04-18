import { DEFAULT_CON_ID, ICondition, plainToInstance, toBool } from '@joktec/core';
import { IMongoRepository } from './mongo.client';
import { MongoService } from './mongo.service';
import { AnyParamConstructor, ModelType } from '@typegoose/typegoose/lib/types';
import { IMongoAggregation, IMongoRequest, MongoBulkRequest } from './models';
import {
  convertPopulate,
  DELETE_OPTIONS,
  preHandleBody,
  preHandleQuery,
  preHandleUpdateBody,
  projection,
  UPDATE_OPTIONS,
  UPSERT_OPTIONS,
} from './mongo.utils';
import { isNil, pick } from 'lodash';
import { MongoCatch } from './mongo.exception';

export abstract class MongoRepo<T, ID = string> implements IMongoRepository<T, ID> {
  protected constructor(
    protected mongoService: MongoService,
    protected schema: AnyParamConstructor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  protected get model(): ModelType<T> {
    return this.mongoService.getModel(this.schema, this.conId);
  }

  protected get isSoftDelete(): boolean {
    return this.model.schema.paths.hasOwnProperty('deletedAt');
  }

  protected transform(docs: any | any[]): T | T[] {
    if (isNil(docs)) return null;
    return plainToInstance(this.schema, docs);
  }

  @MongoCatch
  async find(query: IMongoRequest): Promise<T[]> {
    const condition: ICondition = preHandleQuery(query, this.isSoftDelete);
    const lean = toBool(query.lean, true);
    const qb = this.model.find(condition, projection(query.select), { lean });
    if (query.limit && query.page) qb.limit(query.limit).skip((query.page - 1) * query.limit);
    if (query.sort) qb.sort(query.sort);
    if (query.populate?.length) qb.populate(convertPopulate(query.populate));

    const docs: any[] = await qb.lean().exec();
    return this.transform(docs) as T[];
  }

  @MongoCatch
  async count(query: IMongoRequest): Promise<number> {
    const condition: ICondition = preHandleQuery(query, this.isSoftDelete);
    if (condition.hasOwnProperty('location')) {
      return this.model.estimatedDocumentCount(condition);
    }
    return this.model.countDocuments(condition);
  }

  @MongoCatch
  async findOne(query: IMongoRequest): Promise<T> {
    const condition: ICondition = preHandleQuery(query, this.isSoftDelete);
    const lean = toBool(query.lean, true);
    const qb = this.model.findOne(condition, projection(query.select), { lean });
    if (query.populate?.length) qb.populate(convertPopulate(query.populate));
    const doc = await qb.lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async aggregate(aggregations: IMongoAggregation[]): Promise<T[]> {
    const qb = this.model.aggregate(aggregations);
    return qb.exec();
  }

  @MongoCatch
  async create(body: Partial<T>): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const processBody: Partial<T> = preHandleBody(transformBody);
    const doc = await this.model.create(processBody);
    return this.findOne({ condition: { _id: doc._id } });
  }

  @MongoCatch
  async update(condition: ICondition, body: Partial<T>): Promise<T> {
    const transformBody: T = this.transform(body) as T;
    const processBody: Partial<T> = preHandleUpdateBody(transformBody);
    const overrideCondition: ICondition = preHandleQuery({ condition }, this.isSoftDelete);
    const qb = this.model.findOneAndUpdate(overrideCondition, processBody, UPDATE_OPTIONS);
    const doc = await qb.lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async delete(condition: ICondition, opts?: { force?: boolean; userId?: ID }): Promise<T> {
    const force: boolean = toBool(opts?.force, false);
    const overrideCondition: ICondition = preHandleQuery({ condition }, this.isSoftDelete);
    if (!force && this.isSoftDelete) {
      const bodyDeleted = { deletedAt: new Date(), deletedBy: opts?.userId ?? null };
      const doc = await this.model.findOneAndUpdate(overrideCondition, bodyDeleted, UPDATE_OPTIONS).lean().exec();
      return this.transform(doc) as T;
    }
    const doc = await this.model.findOneAndRemove(overrideCondition, DELETE_OPTIONS).lean().exec();
    return this.transform(doc) as T;
  }

  @MongoCatch
  async upsert(condition: ICondition, body: T): Promise<T> {
    const overrideCondition: ICondition = preHandleQuery({ condition }, this.isSoftDelete);
    const res = await this.model.updateOne(overrideCondition, body, UPSERT_OPTIONS);
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
