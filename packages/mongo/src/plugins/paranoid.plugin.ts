import { Clazz, toArray, toBool } from '@joktec/core';
import { isEmpty, isObject, isString } from 'lodash';
import { QueryOptions, Schema } from 'mongoose';
import {
  IMongoFacetPipeline,
  IMongoLookupPipeline,
  IMongoMergePipeline,
  IMongoPipeline,
  IMongoUnionWithPipeline,
} from '../models';

export interface ParanoidOptions {
  deletedAt?: { name?: string; type?: Clazz };
}

export interface ParanoidQueryOptions<T = any> extends QueryOptions<T> {
  paranoid?: boolean;
  force?: boolean;
}

function injectFilter(filter: Record<string, any>, key: string, paranoid: boolean = true) {
  if (!paranoid) return filter;
  return Object.assign(filter, { [key]: null });
}

function injectMatchPipeline(pipelines: IMongoPipeline[], key: string, paranoid: boolean = true): IMongoPipeline[] {
  const newPipelines: IMongoPipeline[] = [];
  for (const pipeline of toArray(pipelines)) {
    if ('$match' in pipeline) {
      injectFilter(pipeline.$match, key, paranoid);
    }

    if ('$lookup' in pipeline) {
      const subPipelines = injectMatchPipeline(pipeline.$lookup.pipeline, key, paranoid);
      if (subPipelines.length) {
        pipeline.$lookup.pipeline = subPipelines.map(subPipeline => subPipeline as IMongoLookupPipeline);
      }
    }

    if ('$unionWith' in pipeline) {
      const unionWith = isString(pipeline.$unionWith) ? { coll: pipeline.$unionWith } : pipeline.$unionWith;
      const subPipelines = injectMatchPipeline(unionWith.pipeline, key, paranoid);
      if (subPipelines.length) {
        unionWith.pipeline = subPipelines.map(subPipeline => subPipeline as IMongoUnionWithPipeline);
        pipeline.$unionWith = unionWith;
      }
    }

    if ('$facet' in pipeline) {
      const fields = Object.keys(pipeline.$facet);
      for (const field of fields) {
        const subPipelines = injectMatchPipeline(pipeline.$facet[field], key, paranoid);
        if (subPipelines.length) {
          pipeline.$facet[field] = subPipelines.map(subPipeline => subPipeline as IMongoFacetPipeline);
        }
      }
    }

    if ('$merge' in pipeline && isObject(pipeline['$merge'].whenMatched)) {
      const subPipelines = injectMatchPipeline(pipeline['$merge'].whenMatched, key, paranoid);
      if (subPipelines.length) {
        pipeline['$merge'].whenMatched = subPipelines.map(subPipeline => subPipeline as IMongoMergePipeline);
      }
    }

    newPipelines.push(pipeline);
  }

  const match = injectFilter({}, key, paranoid);
  if (!newPipelines.some(p => '$match' in p) && !isEmpty(match)) {
    newPipelines.unshift({ $match: match });
  }

  return newPipelines;
}

export const ParanoidPlugin = (schema: Schema, opts?: ParanoidOptions) => {
  const deletedAtKey = opts?.deletedAt?.name || 'deletedAt';

  // Add deletedAt field
  schema.add({
    [deletedAtKey]: {
      type: opts?.deletedAt?.type || Date,
      default: null,
      deletedAt: deletedAtKey,
      select: false,
    },
  });

  schema.pre(
    [
      'find',
      'findOne',
      'findOneAndUpdate',
      'countDocuments',
      'estimatedDocumentCount',
      'updateMany',
      'updateOne',
      'deleteOne',
      'findOneAndDelete',
      'deleteMany',
    ],
    function (next) {
      const options = this.getOptions();

      // Intercept filter
      const filter = this.getFilter();
      injectFilter(filter, deletedAtKey, options?.paranoid);
      this.setQuery(filter);

      next();
    },
  );

  // Aggregate
  schema.pre('aggregate', function (next, options: ParanoidQueryOptions) {
    const paranoid = toBool(options?.paranoid, true);
    const pipelines: IMongoPipeline[] = injectMatchPipeline(this.pipeline(), deletedAtKey, paranoid);
    while (this.pipeline().length) this.pipeline().shift();
    while (pipelines.length) this.pipeline().push(pipelines.shift());
    next();
  });
};
