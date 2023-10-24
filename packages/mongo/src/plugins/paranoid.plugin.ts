import { Clazz, toArray } from '@joktec/core';
import { isEmpty } from 'lodash';
import { Schema, PopulateOptions, QueryOptions } from 'mongoose';
import { ObjectId } from '../models';

export interface ParanoidOptions {
  deletedAt?: { name?: string; type?: Clazz };
  deletedBy?: { name?: string; type?: Clazz };
}

export interface ParanoidQueryOptions extends QueryOptions<any> {
  // Use for filter
  withDeleted?: boolean;
  onlyDeleted?: boolean;

  // Use for deleted
  force?: boolean;
  deletedBy?: string | ObjectId;
}

function injectFilter(filter: Record<string, any>, key: string, options: ParanoidQueryOptions) {
  if (options?.onlyDeleted) return Object.assign(filter, { [key]: { $ne: null } });
  if (options?.withDeleted) return filter;
  return Object.assign(filter, { [key]: null });
}

function convertPopulate(populates: string | PopulateOptions | (string | PopulateOptions)[]): PopulateOptions[] {
  return toArray<string | PopulateOptions>(populates).map(populate => {
    if (typeof populate === 'string') {
      populate = { path: populate } as PopulateOptions;
    }
    return populate;
  });
}

function injectPopulateFilter(
  populates: string | PopulateOptions | (string | PopulateOptions)[],
  key: string,
  options?: ParanoidQueryOptions,
): PopulateOptions[] {
  return convertPopulate(populates).map(populate => {
    if (!populate.match) populate.match = {};
    injectFilter(populate.match, key, options);
    if (populate.populate) injectPopulateFilter(populate.populate, key, options);
    return populate;
  });
}

export const ParanoidPlugin = (schema: Schema, opts?: ParanoidOptions) => {
  const deletedAtKey = opts?.deletedAt?.name || 'deletedAt';
  const deletedByKey = opts?.deletedBy?.name || 'deletedBy';

  // Add deletedAt and deletedBy
  schema.add({
    [deletedAtKey]: {
      type: opts?.deletedAt?.type || Date,
      default: null,
      deletedAt: deletedAtKey,
    },
    [deletedByKey]: {
      type: opts?.deletedBy?.type || ObjectId,
      default: null,
      deletedBy: deletedByKey,
    },
  });

  schema.pre(
    [
      'find',
      'findOne',
      'findOneAndUpdate',
      'count',
      'countDocuments',
      'estimatedDocumentCount',
      'updateMany',
      'updateOne',
      'deleteOne',
      'findOneAndDelete',
      'findOneAndRemove',
      'deleteMany',
    ],
    function (next) {
      const options = this.getOptions();

      // Intercept filter
      const filter = this.getFilter();
      injectFilter(filter, deletedAtKey, options);
      this.setQuery(filter);

      // Intercept populate
      const populatedPaths = this.getPopulatedPaths();
      if (populatedPaths.length) {
        const populates = populatedPaths.flatMap(path => {
          const populateOptions = this.mongooseOptions().populate[path] as PopulateOptions;
          return injectPopulateFilter(populateOptions, deletedAtKey, options);
        });
        this.populate(populates);
      }

      // Intercept update data
      const data = this.getUpdate();
      if (data) {
        delete data['$set'][deletedAtKey];
        delete data['$set'][deletedByKey];
        this.setUpdate(data);
      }

      next();
    },
  );

  // Aggregate
  schema.pre('aggregate', function (next, opts: ParanoidQueryOptions) {
    const match = injectFilter({}, deletedAtKey, opts);
    if (!isEmpty(match)) {
      this.pipeline().unshift({ $match: match });
    }
    next();
  });
};