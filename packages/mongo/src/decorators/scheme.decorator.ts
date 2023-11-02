import { applyDecorators, Entity, KeyOf, SetMetadata, toArray, toPlural } from '@joktec/core';
import { index, modelOptions, plugin, pre, queryMethod, Severity } from '@typegoose/typegoose';
import { Func, ICustomOptions, IndexOptions } from '@typegoose/typegoose/lib/types';
import { snakeCase } from 'lodash';
import mongoose, { PipelineStage, SchemaOptions } from 'mongoose';
import { MongoHelper } from '../helpers';
import { ObjectId, QueryMethods } from '../models';
import { ParanoidPlugin, ParanoidOptions } from '../plugins/paranoid.plugin';

export interface IPlugin<TFunc extends Func = any, TParams = Parameters<TFunc>[1]> {
  mongoosePlugin: TFunc;
  options?: TParams;
}

export interface IIndexOptions {
  fields: mongoose.IndexDefinition;
  options?: IndexOptions;
}

export interface ISchemaOptions<T extends Entity = {}> {
  collection?: string;
  schemaOptions?: Omit<SchemaOptions, 'collection'>;
  customOptions?: ICustomOptions;
  indexes?: IIndexOptions[];
  plugins?: IPlugin[];
  paranoid?: boolean | ParanoidOptions;
  textSearch?: string | KeyOf<T>[];
  geoSearch?: KeyOf<T>;
}

export const Schema = <T extends Entity = {}>(options: ISchemaOptions<T> = {}): ClassDecorator => {
  return (target: any) => {
    const className = target.name;

    const useParanoid: boolean = !!options?.paranoid;
    const paranoidOpts: ParanoidOptions = {
      deletedAt: { name: 'deletedAt', type: Date },
      deletedBy: { name: 'deletedBy', type: ObjectId },
    };
    if (typeof options?.paranoid === 'object') {
      Object.assign(paranoidOpts, options.paranoid);
    }

    const opts: ISchemaOptions<T> = {
      collection: options?.collection || snakeCase(toPlural(className)),
      schemaOptions: {
        strict: true,
        strictQuery: true,
        id: true,
        minimize: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        ...options?.schemaOptions,
      },
      customOptions: { allowMixed: Severity.ALLOW, ...options?.customOptions },
      indexes: toArray(options?.indexes),
      plugins: toArray(options?.plugins),
      paranoid: useParanoid && paranoidOpts,
      textSearch: toArray<any>(options?.textSearch, { split: ',' }),
      geoSearch: options?.geoSearch,
    };

    const decorators: Array<ClassDecorator> = [
      SetMetadata<string, ISchemaOptions<T>>(className, opts),
      modelOptions({
        schemaOptions: { collection: opts.collection, ...opts.schemaOptions },
        options: { ...opts.customOptions },
      }),
    ];

    if (opts?.textSearch?.length) {
      const fields = toArray(opts.textSearch).reduce<mongoose.IndexDefinition>((idxObj, field) => {
        idxObj[field] = 'text';
        return idxObj;
      }, {});
      opts.indexes.push({ fields });
    }

    if (options?.geoSearch) {
      opts.indexes.push({ fields: { [options.geoSearch]: '2dsphere' } });
    }

    const middlewares = [
      pre('save', function (next) {
        ['_id', '__v', 'createdAt', 'updatedAt', '__t'].map(path => {
          if (this[path]) delete this[path];
        });
        next();
      }),
      pre(
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
      ),
      pre('aggregate', function (next) {
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
      }),
    ];

    decorators.push(...middlewares);
    QueryMethods.map(method => decorators.push(queryMethod(method)));
    opts.indexes.map(idx => decorators.push(index(idx.fields, idx.options)));
    opts.plugins.map(p => decorators.push(plugin(p.mongoosePlugin, p.options)));
    if (useParanoid) decorators.push(plugin(ParanoidPlugin, paranoidOpts));

    applyDecorators(...decorators)(target);
  };
};
