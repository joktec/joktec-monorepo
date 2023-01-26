import { MongoReadRepo } from './mongo-read.repo';
import { MongoWriteRepoClient } from '../mongo.client';
import { MongoService } from '../mongo.service';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { MongoBulkRequest, MongoCondition } from '../models';
import { preHandleBody } from '../mongo.utils';
import { pick } from 'lodash';

export abstract class MongoRepo<T> extends MongoReadRepo<T> implements MongoWriteRepoClient<T> {
  protected constructor(
    protected collection: string,
    protected mongoService: MongoService,
    protected schema: AnyParamConstructor<any>,
    protected conId?: string,
  ) {
    super(collection, mongoService, schema, conId);
  }

  async create(body: T): Promise<T> {
    const processBody: T = preHandleBody(body);
    return this.query().create(processBody);
  }

  async update(condition: MongoCondition, body: T): Promise<T | null> {
    const processBody: T = preHandleBody(body);
    const qb = this.query().findOneAndUpdate(condition, processBody, { runValidators: true, new: true });
    return qb.exec();
  }

  async delete(condition: MongoCondition): Promise<T> {
    return this.query().findOneAndRemove(condition, { rawResult: false });
  }

  async upsert(condition: MongoCondition, body: T): Promise<T> {
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
