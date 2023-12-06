import { Clazz, toArray, toBool } from '@joktec/core';
import { isEmpty, isString } from 'lodash';
import { PipelineStage, QueryOptions, Schema } from 'mongoose';
import { ObjectId } from '../models';

export interface ParanoidOptions {
  deletedAt?: { name?: string; type?: Clazz };
  deletedBy?: { name?: string; type?: Clazz };
}

export interface ParanoidQueryOptions<T = any> extends QueryOptions<T> {
  paranoid?: boolean;
  force?: boolean;
  deletedBy?: string | ObjectId | any;
  restoredBy?: string | ObjectId | any;
}

function injectFilter(filter: Record<string, any>, key: string, paranoid: boolean = true) {
  if (!paranoid) return filter;
  return Object.assign(filter, { [key]: null });
}

function rejectPipeline(pipelines: PipelineStage[]): Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[] {
  const result: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[] = [];
  pipelines.map(p => {
    if ('$merge' in p) return;
    if ('$out' in p) return;
    result.push(p);
  });
  return result;
}

function injectMatchPipeline(pipelines: PipelineStage[], key: string, paranoid: boolean = true): PipelineStage[] {
  const newPipelines: PipelineStage[] = [];
  for (const pipeline of toArray(pipelines)) {
    if ('$match' in pipeline) injectFilter(pipeline.$match, key, paranoid);
    if ('$lookup' in pipeline) {
      const lookupPipelines = injectMatchPipeline(pipeline.$lookup.pipeline, key, paranoid);
      if (lookupPipelines.length) pipeline.$lookup.pipeline = rejectPipeline(lookupPipelines);
    }
    if ('$unionWith' in pipeline) {
      const unionWith = isString(pipeline.$unionWith) ? { coll: pipeline.$unionWith } : pipeline.$unionWith;
      const unionWithPipes = injectMatchPipeline(unionWith.pipeline, key, paranoid);
      if (unionWithPipes.length) {
        unionWith.pipeline = rejectPipeline(unionWithPipes);
        pipeline.$unionWith = unionWith;
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
    const pipelines: PipelineStage[] = injectMatchPipeline(this.pipeline(), deletedAtKey, paranoid);
    while (this.pipeline().length) this.pipeline().shift();
    while (pipelines.length) this.pipeline().push(pipelines.shift());
    next();
  });
};
