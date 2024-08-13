import { toArray } from '@joktec/core';
import { index } from '@typegoose/typegoose';
import { IndexOptions } from '@typegoose/typegoose/lib/types';
import { get, union } from 'lodash';
import mongoose from 'mongoose';
import { IIndexOptions, ISchemaOptions } from '../decorators';

export function buildIndex(options: ISchemaOptions): ClassDecorator[] {
  const indexes: IIndexOptions[] = [];

  if (options?.index) {
    toArray(options.index).map(key => {
      const fields: mongoose.IndexDefinition = key.split(',').reduce((obj, curr) => {
        obj[curr] = 1;
        return obj;
      }, {});
      indexes.push({ fields });
    });
  }

  if (options?.unique) {
    toArray(options.unique).map(key => {
      const opts: IndexOptions = { unique: true, background: true, partialFilterExpression: {} };
      const fields: mongoose.IndexDefinition = {};
      key.split(',').map(field => {
        fields[field] = 1;
        opts.partialFilterExpression[field] = { $type: ['number', 'string', 'objectId'] };
      });
      indexes.push({ fields, options: opts });
    });
  }

  if (options?.textSearch) {
    const fields: mongoose.IndexDefinition = options.textSearch.split(',').reduce((obj, path) => {
      obj[path] = 'text';
      return obj;
    }, {});
    indexes.push({ fields });
  }

  if (options?.geoSearch) {
    indexes.push({ fields: { [options.geoSearch]: '2dsphere' } });
  }

  const defOptions: IndexOptions = { background: true, partialFilterExpression: {} };
  const deletedAt: string = get(options, 'paranoid.deletedAt.name', 'deletedAt');
  const paranoid: string = options?.paranoid ? deletedAt : null;
  return union(indexes, options.customIndexes).map(idx => {
    idx.options = { ...defOptions, ...idx.options };
    if (paranoid) {
      // TODO: Fix later - This cause error when search text
      // Object.assign(idx.options.partialFilterExpression, { [paranoid]: { $type: 'null' } });
    }
    return index(idx.fields, idx.options);
  });
}
