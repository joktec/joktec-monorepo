import { DEFAULT_CON_ID, ICondition, toBool } from '@joktec/core';
import { IMongoRepository } from './mongo.client';
import { MongoService } from './mongo.service';
import { AnyParamConstructor, ModelType } from '@typegoose/typegoose/lib/types';
import { IMongoRequest, IMongoAggregation, MongoBulkRequest } from './models';
import {
  preHandleQuery,
  preHandleBody,
  UPDATE_OPTIONS,
  DELETE_OPTIONS,
  UPSERT_OPTIONS,
  projection,
  convertPopulate,
} from './mongo.utils';
import { pick } from 'lodash';
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

  @MongoCatch
  async find(query: IMongoRequest): Promise<T[]> {
    const condition: ICondition = preHandleQuery(query, this.isSoftDelete);
    const lean = toBool(query.lean, true);
    const qb = this.model.find(condition, projection(query.select), { lean });
    if (query.limit && query.page) qb.limit(query.limit).skip((query.page - 1) * query.limit);
    if (query.sort) qb.sort(query.sort);
    if (query.populate?.length) qb.populate(convertPopulate(query.populate));
    return qb.exec();
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
    return qb.exec();
  }

  @MongoCatch
  async aggregate(aggregations: IMongoAggregation[]): Promise<T[]> {
    const qb = this.model.aggregate(aggregations);
    return qb.exec();
  }

  @MongoCatch
  async create(body: Partial<T>): Promise<T> {
    const processBody: Partial<T> = preHandleBody(body);
    return this.model.create(processBody);
  }

  @MongoCatch
  async update(condition: ICondition, body: Partial<T>): Promise<T> {
    const overrideCondition: ICondition = preHandleQuery({ condition }, this.isSoftDelete);
    const processBody: Partial<T> = preHandleBody(body);
    const qb = this.model.findOneAndUpdate(overrideCondition, processBody, UPDATE_OPTIONS);
    return qb.exec();
  }

  @MongoCatch
  async delete(condition: ICondition, opts?: { force?: boolean; userId?: ID }): Promise<T> {
    const force: boolean = toBool(opts?.force, false);
    const overrideCondition: ICondition = preHandleQuery({ condition }, this.isSoftDelete);
    if (!force && this.isSoftDelete) {
      const bodyDeleted = { deletedAt: new Date(), deletedBy: opts?.userId ?? null };
      return this.model.findOneAndUpdate(overrideCondition, bodyDeleted, UPDATE_OPTIONS);
    }
    return this.model.findOneAndRemove(overrideCondition, DELETE_OPTIONS).exec();
  }

  @MongoCatch
  async upsert(condition: ICondition, body: T): Promise<T> {
    const overrideCondition: ICondition = preHandleQuery({ condition }, this.isSoftDelete);
    const res = await this.model.updateOne(overrideCondition, body, UPSERT_OPTIONS);
    return this.model.findById(res.upsertedId).exec();
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
