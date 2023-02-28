import { DEFAULT_CON_ID, ICondition, toArray, toBool } from '@joktec/core';
import { IMongoRepository } from './mongo.client';
import { MongoService } from './mongo.service';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { IMongoRequest, IMongoAggregation, MongoBulkRequest, MongoId } from './models';
import { preHandleQuery, preHandleBody } from './mongo.utils';
import { pick } from 'lodash';

export abstract class MongoRepo<T, ID = MongoId> implements IMongoRepository<T, ID> {
  private softDelete: boolean = false;

  protected constructor(
    protected mongoService: MongoService,
    protected schema: AnyParamConstructor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  protected query() {
    const model = this.mongoService.getModel(this.schema, this.conId);
    this.softDelete = model.schema.paths.hasOwnProperty('deletedAt');
    return model;
  }

  async find(query: IMongoRequest): Promise<T[]> {
    const condition: ICondition = preHandleQuery(query, this.softDelete);
    const qb = this.query().find(condition);
    if (query.select) qb.select(toArray<string>(query.select).join(','));
    if (query.limit && query.page) qb.limit(query.limit).skip((query.page - 1) * query.limit);
    if (query.sort) qb.sort(query.sort);
    if (query.populate?.length) query.populate.map(qb.populate);
    if (query.lean) qb.lean();
    return qb.exec();
  }

  async count(query: IMongoRequest): Promise<number> {
    const condition: ICondition = preHandleQuery(query, this.softDelete);
    if (condition.hasOwnProperty('location')) {
      return this.query().estimatedDocumentCount(condition);
    }
    return this.query().countDocuments(condition);
  }

  async findOne(query: IMongoRequest): Promise<T | null> {
    const condition: ICondition = preHandleQuery(query, this.softDelete);
    const qb = this.query().findOne(condition);
    if (query.select) qb.select(toArray<string>(query.select).join(','));
    if (query.populate?.length) query.populate.map(qb.populate);
    if (query.lean) qb.lean();
    return qb.exec();
  }

  async aggregate(aggregations: IMongoAggregation[]): Promise<T[]> {
    const qb = this.query().aggregate(aggregations);
    return qb.exec();
  }

  async create(body: T): Promise<T> {
    const processBody: T = preHandleBody(body);
    return this.query().create(processBody);
  }

  async update(condition: ICondition, body: T): Promise<T> {
    const overrideCondition: ICondition = preHandleQuery({ condition }, this.softDelete);
    const processBody: T = preHandleBody(body);
    const qb = this.query().findOneAndUpdate(overrideCondition, processBody, { runValidators: true, new: true });
    return qb.exec();
  }

  async delete(condition: ICondition, opts?: { force?: boolean }): Promise<T> {
    const force: boolean = toBool(opts?.force, false);
    if (force || !this.softDelete) {
      const forceCondition: ICondition = preHandleQuery({ condition });
      return this.query().findOneAndRemove(forceCondition, { rawResult: false }).exec();
    }

    const softCondition: ICondition = preHandleQuery({ condition }, this.softDelete);
    const bodyToDelete: any = { deletedAt: new Date() };
    return this.query().findOneAndUpdate(softCondition, bodyToDelete, { runValidators: true, new: true }).exec();
  }

  async upsert(condition: ICondition, body: T): Promise<T> {
    const overrideCondition: ICondition = preHandleQuery({ condition }, this.softDelete);
    const res = await this.query().updateOne(overrideCondition, body, { upsert: true });
    return this.query().findById(res.upsertedId).exec();
  }

  async bulkUpsert(docs: T[], upsert?: MongoBulkRequest): Promise<any> {
    const { selectedFields, conditions, operator = 'set' } = upsert ?? {};
    const bulkDocs = docs?.map(doc => {
      return {
        updateOne: {
          filter: pick(doc, conditions ?? ['_id']),
          update: { [`$${operator}`]: selectedFields ? pick(doc, selectedFields) : doc },
          upsert: true,
        },
      };
    });
    return this.query().bulkWrite(bulkDocs);
  }
}
