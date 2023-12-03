import { applyDecorators, Entity, SetMetadata, toArray, toPlural } from '@joktec/core';
import { index, modelOptions, plugin, queryMethod, Severity } from '@typegoose/typegoose';
import { Func, ICustomOptions, IndexOptions } from '@typegoose/typegoose/lib/types';
import { get, snakeCase, union } from 'lodash';
import mongoose, { IndexDirection, SchemaOptions } from 'mongoose';
import { preAggregate, preBase, preSave } from '../helpers';
import { ObjectId, QueryMethods } from '../models';
import { ParanoidOptions, ParanoidPlugin } from '../plugins';

export interface IPlugin<TFunc extends Func = any, TParams = Parameters<TFunc>[1]> {
  mongoosePlugin: TFunc;
  options?: TParams;
}

export interface IIndexOptions {
  fields: Record<string, IndexDirection>;
  options?: IndexOptions;
}

export interface ISchemaOptions {
  collection?: string;
  schemaOptions?: Omit<SchemaOptions, 'collection'>;
  customOptions?: ICustomOptions;
  // Plugins
  paranoid?: boolean | ParanoidOptions;
  plugins?: IPlugin[];
  // Index
  index?: string | string[];
  unique?: string | string[];
  textSearch?: string;
  geoSearch?: string;
  customIndexes?: IIndexOptions[];
}

export const Schema = <T extends Entity = {}>(options: ISchemaOptions = {}): ClassDecorator => {
  return (target: any) => {
    const className = target.name;

    const opts: ISchemaOptions = {
      ...options,
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
    };

    const baseDecorators: Array<ClassDecorator> = [
      SetMetadata<string, ISchemaOptions>(className, opts),
      modelOptions({
        schemaOptions: { ...opts.schemaOptions, collection: opts.collection },
        options: { ...opts.customOptions },
      }),
    ];
    const middlewares = [preSave<T>(), preBase<T>(), preAggregate<T>()];
    const queryMethods = QueryMethods.map(method => queryMethod(method));
    const plugins = buildPlugin(options);
    const indexes = buildIndex(options);

    const decorators = union(baseDecorators, middlewares, queryMethods, plugins, indexes);
    applyDecorators(...decorators)(target);
  };
};

function buildIndex(options: ISchemaOptions): ClassDecorator[] {
  const indexes: IIndexOptions[] = [];

  if (options?.index) {
    toArray(options.index).map(key => {
      const fields = toArray<string>(key, { split: ',' }).reduce<mongoose.IndexDefinition>((idxObj, field) => {
        idxObj[field] = 1;
        return idxObj;
      }, {});
      indexes.push({ fields });
    });
  }

  if (options?.unique) {
    const deletedAt = get(options, 'paranoid.deletedAt.name', 'deletedAt');
    const paranoid = options?.paranoid ? deletedAt : null;

    toArray(options.unique).map(key => {
      const opts: IndexOptions = { unique: true };

      const fields: mongoose.IndexDefinition = {};
      const partialFilter: Record<string, any> = {};
      toArray<string>(key, { split: ',' }).map(field => {
        fields[field] = 1;
        partialFilter[field] = { $exists: true };
      });

      if (paranoid) {
        fields[paranoid] = 1;
        partialFilter[paranoid] = { $exists: true };
      }

      if (Object.keys(fields).length === 1) {
        opts.sparse = true;
      } else {
        opts.partialFilterExpression = partialFilter;
      }

      indexes.push({ fields, options: opts });
    });
  }

  if (options?.textSearch) {
    const fields = toArray(options.textSearch, { split: ',' }).reduce<mongoose.IndexDefinition>((idxObj, field) => {
      idxObj[field] = 'text';
      return idxObj;
    }, {});
    indexes.push({ fields });
  }

  if (options?.geoSearch) {
    indexes.push({ fields: { [options.geoSearch]: '2dsphere' } });
  }

  return union(indexes, options.customIndexes).map(idx => index(idx.fields, idx.options));
}

function buildPlugin(options: ISchemaOptions): ClassDecorator[] {
  const plugins = toArray(options.plugins).map(p => plugin(p.mongoosePlugin, p.options));
  if (options.paranoid) {
    const paranoidOpts: ParanoidOptions = {
      deletedAt: { name: 'deletedAt', type: Date },
      deletedBy: { name: 'deletedBy', type: ObjectId },
    };
    if (typeof options?.paranoid === 'object') {
      Object.assign(paranoidOpts, options.paranoid);
    }
    plugins.push(plugin(ParanoidPlugin, paranoidOpts));
  }
  // plugins.push(plugin(UniquePlugin.mongoosePlugin, UniquePlugin.options));
  return plugins;
}
