import { DeepPartial, ICondition, INear, toInt } from '@joktec/core';
import { queryMethod, types } from '@typegoose/typegoose';
import { isEmpty, isNil } from 'lodash';
import { QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';
import { DELETE_OPTIONS, PARANOID_OPTIONS, RESTORE_OPTIONS } from '../helpers';
import { ParanoidQueryOptions } from '../plugins';

export interface QueryHelper<T> {
  search: types.AsQueryMethod<typeof search<T>>;
  center: types.AsQueryMethod<typeof center<T>>;
  destroyOne: types.AsQueryMethod<typeof destroyOne<T>>;
  destroyMany: types.AsQueryMethod<typeof destroyMany<T>>;
  restore: types.AsQueryMethod<typeof restore<T>>;
}

function search<T>(this: types.QueryHelperThis<any, QueryHelper<T>>, keyword?: string) {
  if (!keyword) return this;
  return this.find({ $text: { $search: keyword } });
}

function center<T>(this: types.QueryHelperThis<any, QueryHelper<T>>, near?: INear) {
  if (isNil(near) || isEmpty(near)) return this;
  const qb = this.find();
  const paths = Object.keys(near);
  if (!paths.length) return qb;
  if (paths.length === 1) {
    const { lat, lng, distance } = near[paths[0]];
    qb.near(paths[0], { center: [lng, lat], maxDistance: toInt(distance, 1000) });
  }

  paths.map(path => {
    const { lat, lng, distance } = near[path];
    const radius = toInt(distance, 1000) / 6378.1;
    const area = { center: [lng, lat], radius, unique: true };
    return qb.where(path).within().circle(area);
  });

  return qb;
}

function destroyOne<T>(
  this: types.QueryHelperThis<any, QueryHelper<T>>,
  filter?: ICondition<T>,
  options?: ParanoidQueryOptions<T>,
): QueryWithHelpers<T, T> {
  const paths = this.model.schema.paths;
  const isParanoid = Object.values(paths).some(schema => !!schema.options.deletedAt);
  if (!isParanoid || options?.force) {
    return this.findOneAndDelete(filter, { ...DELETE_OPTIONS, ...options });
  }

  const bodyUpdate = Object.values(paths).reduce((body, schema) => {
    if (schema.options.deletedAt) body[schema.options.deletedAt] = new Date();
    return body;
  }, {});
  return this.findOneAndUpdate(filter, { $set: bodyUpdate }, { ...PARANOID_OPTIONS, ...options });
}

function destroyMany<T>(
  this: types.QueryHelperThis<any, QueryHelper<T>>,
  filter?: ICondition<T>,
  options?: ParanoidQueryOptions<T>,
): QueryWithHelpers<{ acknowledged: boolean; deletedCount: number } | UpdateWriteOpResult, any> {
  const paths = this.model.schema.paths;
  const isParanoid = Object.values(paths).some(schema => !!schema.options.deletedAt);
  if (!isParanoid || options?.force) {
    return this.deleteMany(filter, { ...options, ...DELETE_OPTIONS });
  }

  const bodyUpdate = Object.values(paths).reduce((body, schema) => {
    if (schema.options.deletedAt) body[schema.options.deletedAt] = new Date();
    return body;
  }, {});
  return this.updateMany(filter, { $set: bodyUpdate }, { ...PARANOID_OPTIONS, ...options });
}

function restore<T>(
  this: types.QueryHelperThis<any, QueryHelper<T>>,
  filter?: ICondition<T>,
  options?: ParanoidQueryOptions<T>,
): QueryWithHelpers<T, T> {
  const paths = this.model.schema.paths;
  const bodyUpdate: DeepPartial<T> = Object.values(paths).reduce((body, schema) => {
    if (schema.options.deletedAt) body[schema.options.deletedAt] = null;
    return body;
  }, {});
  return this.findOneAndUpdate(filter, { $set: bodyUpdate }, { ...RESTORE_OPTIONS, ...options });
}

export function buildQueryMethod(): ClassDecorator[] {
  const QueryMethods = [search, center, destroyOne, destroyMany, restore];
  return QueryMethods.map(method => queryMethod(method));
}
