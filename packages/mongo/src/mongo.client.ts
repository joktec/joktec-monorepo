import { Client, IBaseRepository } from '@joktec/core';
import { ReturnModelType } from '@typegoose/typegoose';
import { ClientSession, ClientSessionOptions, Connection, RefType } from 'mongoose';
import { QueryHelper } from './helpers';
import { IMongoAggregateOptions, IMongoPipeline, MongoSchema } from './models';
import { MongoConfig } from './mongo.config';

export interface MongoModuleOptions {
  models?: (typeof MongoSchema)[];
  conId?: string;
}

export interface MongoModelRegistry {
  [conId: string]: (typeof MongoSchema)[];
}

export type MongoType<T extends MongoSchema = MongoSchema> = ReturnModelType<typeof MongoSchema, QueryHelper<T>>;

export interface MongoClient extends Client<MongoConfig, Connection> {
  isConnected(conId?: string): boolean;

  getModel<T extends MongoSchema>(schemaClass: typeof MongoSchema): MongoType<T>;

  startTransaction(options?: ClientSessionOptions, conId?: string): Promise<ClientSession>;
}

export interface IMongoRepository<T extends MongoSchema, ID extends RefType = string> extends IBaseRepository<T, ID> {
  aggregate<U = T>(pipeline: IMongoPipeline[], opts?: IMongoAggregateOptions<U>): Promise<U[]>;
}
