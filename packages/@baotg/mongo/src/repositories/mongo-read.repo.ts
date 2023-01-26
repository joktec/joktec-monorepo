import { MongoAggregation, MongoCondition, MongoPageableResponse, MongoQuery } from '../models';
import { MongoReadRepoClient } from '../mongo.client';
import { MongoService } from '../mongo.service';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import _ from 'lodash';

export abstract class MongoReadRepo<T> implements MongoReadRepoClient<T> {
  protected constructor(
    protected collection: string,
    protected mongoService: MongoService,
    protected schema: AnyParamConstructor<any>,
    protected conId?: string,
  ) {}

  protected query() {
    return this.mongoService.getModel(this.schema, this.conId);
  }

  async find(query: MongoQuery): Promise<MongoPageableResponse<T>> {
    const qb = this.query().find(query.condition);
    if (query.select) qb.select(query.select);
    if (query.limit && query.page) qb.limit(query.limit).skip((query.page - 1) * query.limit);
    if (query.sort) qb.sort(query.sort);
    for (const populate of query.populate ?? []) {
      qb.populate(populate);
    }
    if (query.lean) qb.lean();

    const [data, total] = await Promise.all([qb.exec(), this.count(query.condition)]);
    return { data, total, page: query.page, pageSize: query.limit };
  }

  async count(condition: MongoCondition): Promise<number> {
    if (condition.location) {
      return this.query().estimatedDocumentCount(condition);
    }
    return this.query().countDocuments(condition);
  }

  async findOne(query: MongoQuery): Promise<T | null> {
    const qb = this.query().findOne(query.condition);
    if (query.select) qb.select(query.select);
    if (query.limit && query.page) qb.limit(query.limit).skip((query.page - 1) * query.limit);
    if (query.sort) qb.sort(query.sort);
    for (const populate of query.populate ?? []) {
      if (_.isNil(populate.match)) populate.match = {};
      qb.populate(populate);
    }
    if (query.lean) qb.lean();
    return qb.exec();
  }

  async aggregate(aggregations: MongoAggregation[]): Promise<T[]> {
    const qb = this.query().aggregate(aggregations);
    return qb.exec();
  }
}
