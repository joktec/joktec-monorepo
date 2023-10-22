import { applyDecorators, Clazz, SetMetadata, toArray, toPlural } from '@joktec/core';
import { index, modelOptions, plugin, Severity } from '@typegoose/typegoose';
import { Func, ICustomOptions, IndexOptions } from '@typegoose/typegoose/lib/types';
import { snakeCase } from 'lodash';
import mongoose, { SchemaOptions } from 'mongoose';
import { ObjectId } from '../models';
import { ParanoidPlugin } from '../plugins/paranoid.plugin';

export interface IPlugin<TFunc extends Func = any, TParams = Parameters<TFunc>[1]> {
  mongoosePlugin: TFunc;
  options?: TParams;
}

export interface IIndexOptions {
  fields: mongoose.IndexDefinition;
  options?: IndexOptions;
}

export interface ISchemaOptions {
  collection?: string;
  schemaOptions?: Omit<SchemaOptions, 'collection'>;
  customOptions?: ICustomOptions;
  indexes?: IIndexOptions[];
  plugins?: IPlugin[];
  paranoid?: boolean | { deletedAt?: { name?: string; type?: Clazz }; deletedBy?: { name?: string; type?: Clazz } };
  textSearch?: string | string[];
  geoSearch?: string;
}

export const Schema = (options: ISchemaOptions = {}): ClassDecorator => {
  return (target: any) => {
    const className = target.name;

    const useParanoid: boolean = !!options?.paranoid;
    const paranoidOpts = {
      deletedAt: { name: 'deletedAt', type: Date },
      deletedBy: { name: 'deletedBy', type: ObjectId },
    };
    if (typeof options?.paranoid === 'object') {
      Object.assign(paranoidOpts, options.paranoid);
    }

    const opts: ISchemaOptions = {
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
      textSearch: toArray(options?.textSearch, { split: ',' }),
      geoSearch: options?.geoSearch,
    };

    const decorators: Array<ClassDecorator> = [
      SetMetadata<string, ISchemaOptions>(className, opts),
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

    opts.indexes.map(idx => decorators.push(index(idx.fields, idx.options)));
    opts.plugins.map(p => decorators.push(plugin(p.mongoosePlugin, p.options)));
    if (opts.paranoid) decorators.push(plugin(ParanoidPlugin, opts.paranoid));

    applyDecorators(...decorators)(target);
  };
};
