import { Entity } from '@joktec/core';
import { pre } from '@typegoose/typegoose';
import { Aggregate, PipelineStage } from 'mongoose';
import { MongoHelper } from './mongo.helper';

export function preSave<T>() {
  return pre<T>('save', function (next) {
    ['_id', '__v', 'createdAt', 'updatedAt', '__t'].map(path => {
      if (this[path]) delete this[path];
    });
    next();
  });
}

export function preBase<T extends Entity>() {
  return pre<T>(
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
      // Intercept options
      if (this.getOptions()) {
        const options = this.getOptions();
        if (options.sort) options.sort = MongoHelper.parseSort(options.sort);
        if (options.projection) options.projection = MongoHelper.parseProjection(options.projection as any);
        this.setOptions(options);
      }

      // Intercept filter
      if (this.getFilter()) {
        const newFilter = MongoHelper.parseFilter(this.getFilter());
        this.setQuery(newFilter);
      }

      // Intercept update
      if (this.getUpdate()) {
        const omitKeys = ['_id', '__v', 'createdAt', 'updatedAt', '__t'];
        const newUpdate = MongoHelper.flatten(this.getUpdate(), omitKeys);
        this.setUpdate(newUpdate);
      }

      next();
    },
    { document: false, query: true },
  );
}

export function preAggregate<T>() {
  return pre<Aggregate<T>>('aggregate', function (next) {
    const pipelines: PipelineStage[] = [];
    while (this.pipeline().length) pipelines.push(this.pipeline().shift());
    pipelines.map(pipeline => {
      if ('$lookup' in pipeline) {
        if (!pipeline.$lookup.pipeline?.length) {
          delete pipeline.$lookup.pipeline;
        }
      }
      this.pipeline().push(pipeline);
    });
    next();
  });
}
