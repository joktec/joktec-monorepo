import { Clazz, toArray, toBool } from '@joktec/core';
import { has } from 'lodash';
import { Schema, Model, Document, PopulateOptions, QueryOptions, FilterQuery } from 'mongoose';
import { ObjectId } from '../models';
import { DELETE_OPTIONS, UPDATE_OPTIONS } from '../mongo.utils';

export interface ParanoidPluginOptions {
  deletedAt?: { name?: string; type?: Clazz };
  deletedBy?: { name?: string; type?: Clazz };
}

interface ParanoidOptions extends QueryOptions<any> {
  field?: string;

  // Use for filter
  withDeleted?: boolean;
  onlyDeleted?: boolean;

  // Use for deleted
  force?: boolean;
  deletedBy?: string | ObjectId;
}

function injectFilter(filter: Record<string, any>, key: string, options: ParanoidOptions) {
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
  options?: ParanoidOptions,
): PopulateOptions[] {
  return convertPopulate(populates).map(populate => {
    if (!populate.match) populate.match = {};
    injectFilter(populate.match, key, options);
    if (populate.populate) injectPopulateFilter(populate.populate, key, options);
    return populate;
  });
}

export const ParanoidPlugin = (schema: Schema, opts?: ParanoidPluginOptions) => {
  const deletedAtKey = opts?.deletedAt?.name || 'deletedAt';
  const deletedByKey = opts?.deletedBy?.name || 'deletedBy';

  // Add deletedAt and deletedBy
  schema.add({
    [deletedAtKey]: opts?.deletedAt?.type || Date,
    [deletedByKey]: opts?.deletedBy?.type || ObjectId,
  });

  // JSON transform
  schema.set('toJSON', {
    transform: (doc: Document, ret: Record<string, any>) => {
      delete ret[deletedAtKey];
      delete ret[deletedByKey];
      return ret;
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

  // Override all method delete
  ['deleteOne', 'findOneAndDelete', 'findOneAndRemove', 'deleteMany'].forEach(method => {
    const original = schema.statics[method];
    schema.statics[method] = async function (condition: FilterQuery<Document>, options?: ParanoidOptions) {
      injectFilter(condition, deletedAtKey, options);

      if (toBool(options?.force, false)) {
        Object.assign(options, DELETE_OPTIONS);
        return original.apply(this, [condition, options]);
      }

      Object.assign(options, UPDATE_OPTIONS, { lean: true });
      const body = {
        [deletedAtKey]: new Date(),
        [deletedByKey]: options.deletedBy,
      };

      const originMethod = method === 'deleteMany' ? (Model as any).updateMany : (Model as any).findOneAndUpdate;
      return originMethod.apply(this, [condition, body, options]);
    };
  });

  // Aggregate
  schema.pre('aggregate', function (next, opts: ParanoidOptions) {
    const includePipeline = (key: string): boolean => {
      return this.pipeline().some(p => has(p, key));
    };

    if (!includePipeline(`$match`)) {
      this.pipeline().unshift({ $match: injectFilter({}, deletedAtKey, opts) });
    }

    next();
  });
};
