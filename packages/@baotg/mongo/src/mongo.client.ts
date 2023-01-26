import { Client } from '@baotg/core';
import { MongoConfig } from './mongo.config';
import { Connection } from 'mongoose';
import { MongoAggregation, MongoCondition, MongoPageableResponse, MongoQuery } from './models';

export interface MongoClient extends Client<MongoConfig, Connection> {}

export interface MongoReadRepoClient<T> {
  find(query: MongoQuery): Promise<MongoPageableResponse<T>>;

  count(condition: MongoCondition): Promise<number>;

  findOne(query: MongoQuery): Promise<T | null>;

  aggregate?(aggregations: MongoAggregation[]): Promise<T[]>;
}

export interface MongoWriteRepoClient<T> {
  create(body: T): Promise<T>;

  update(condition: MongoCondition, body: T): Promise<T>;

  delete(condition: MongoCondition): Promise<T>;

  upsert(condition: MongoCondition, body: T): Promise<T>;
}
