import { applyDecorators, SetMetadata } from '@joktec/core';
import { toPlural } from '@joktec/utils';
import { modelOptions, Severity } from '@typegoose/typegoose';
import { Func, ICustomOptions, IndexOptions } from '@typegoose/typegoose/lib/types';
import { snakeCase, union } from 'lodash';
import { IndexDirection, SchemaOptions } from 'mongoose';
import { buildIndex, buildPlugin, buildQueryMethod } from '../helpers';
import { ParanoidOptions } from '../plugins';

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

export const Schema = (options: ISchemaOptions = {}): ClassDecorator => {
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

    const decorators = union(
      [
        SetMetadata<string, ISchemaOptions>(className, opts),
        modelOptions({
          schemaOptions: { ...opts.schemaOptions, collection: opts.collection },
          options: { ...opts.customOptions },
        }),
      ],
      buildQueryMethod(),
      buildPlugin(options),
      buildIndex(options),
    );
    applyDecorators(...decorators)(target);
  };
};
