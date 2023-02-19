import { DEFAULT_CON_ID, ICondition } from '@joktec/core';
import { MongoRepository } from './mongo.client';
import { MongoService } from './mongo.service';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { IMongoRequest, IMongoAggregation, MongoBulkRequest, IMongoResponse, MongoId } from './models';
import { preHandleQuery, preHandleBody } from './mongo.utils';
import { pick } from 'lodash';

export abstract class MongoRepo<T, ID = MongoId> implements MongoRepository<T, ID> {
  protected constructor(
    protected mongoService: MongoService,
    protected schema: AnyParamConstructor<T>,
    protected conId: string = DEFAULT_CON_ID,
  ) {}

  protected query() {
    return this.mongoService.getModel(this.schema, this.conId);
  }

  async pageable(query: IMongoRequest): Promise<IMongoResponse<T>> {
    const [items, totalItems] = await Promise.all([this.find(query), this.count(query)]);
    return {
      items,
      totalItems,
      page: query.page,
      pageSize: query.limit,
      totalPage: Math.ceil(totalItems / query.limit),
      isLastPage: items.length < query.limit,
    };
  }

  async find(query: IMongoRequest): Promise<T[]> {
    const condition: ICondition = preHandleQuery(query);
    const qb = this.query().find(condition);
    if (query.select) qb.select(query.select);
    if (query.limit && query.page) qb.limit(query.limit).skip((query.page - 1) * query.limit);
    if (query.sort) qb.sort(query.sort);
    if (query.populate?.length) query.populate.map(qb.populate);
    if (query.lean) qb.lean();
    return qb.exec();
  }

  async count(query: IMongoRequest): Promise<number> {
    const condition: ICondition = preHandleQuery(query);
    if (condition.hasOwnProperty('location')) {
      return this.query().estimatedDocumentCount(condition);
    }
    return this.query().countDocuments(condition);
  }

  async findOne(query: IMongoRequest): Promise<T | null> {
    const condition: ICondition = preHandleQuery(query);
    const qb = this.query().findOne(condition);
    if (query.select) qb.select(query.select);
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
    const processBody: T = preHandleBody(body);
    const qb = this.query().findOneAndUpdate(condition, processBody, { runValidators: true, new: true });
    return qb.exec();
  }

  async delete(condition: ICondition): Promise<number> {
    const totalItems: number = await this.count({ condition } as IMongoRequest);
    await this.query().deleteMany(condition, { rawResult: false });
    return totalItems;
  }

  async upsert(condition: ICondition, body: T): Promise<T> {
    const res = await this.query().updateOne(condition, body, { upsert: true });
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
