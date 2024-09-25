import { toArray } from '@joktec/core';
import { index } from '@typegoose/typegoose';
import { IndexOptions } from '@typegoose/typegoose/lib/types';
import { get } from 'lodash';
import mongoose from 'mongoose';
import { IIndexOptions, ISchemaOptions } from '../decorators';

function injectParanoid(indexOption: IIndexOptions, paranoidKey: string = 'deletedAt') {
  if (!indexOption.options.partialFilterExpression) {
    indexOption.options.partialFilterExpression = {};
  }
  if (indexOption.options.sparse) delete indexOption.options.sparse;
  Object.assign(indexOption.options.partialFilterExpression, { [paranoidKey]: { $type: 'null' } });
}

export function buildIndex(options: ISchemaOptions): ClassDecorator[] {
  const deletedAt: string = get(options, 'paranoid.deletedAt.name', 'deletedAt');
  const paranoid: string = options?.paranoid ? deletedAt : null;

  const indexes: IIndexOptions[] = [];

  if (options?.index) {
    toArray(options.index).map(key => {
      const fields: mongoose.IndexDefinition = key.split(',').reduce((obj, curr) => {
        obj[curr] = 1;
        return obj;
      }, {});

      const idx: IIndexOptions = { fields, options: { background: true } };
      if (options.paranoid) injectParanoid(idx, paranoid);
      indexes.push(idx);
    });
  }

  if (options?.unique) {
    toArray(options.unique).map(key => {
      const partialFilterExpression: Record<string, any> = {};
      const opts: IndexOptions = { unique: true, background: true, sparse: true };
      const fields: mongoose.IndexDefinition = {};
      key.split(',').map(field => {
        fields[field] = 1;
        partialFilterExpression[field] = { $exists: true, $type: ['string', 'number', 'date', 'objectId'] };
      });

      const idx: IIndexOptions = { fields, options: opts };
      if (options.paranoid) {
        idx.options.partialFilterExpression = partialFilterExpression;
        injectParanoid(idx, paranoid);
      }
      indexes.push(idx);
    });
  }

  if (options?.textSearch) {
    const fields: mongoose.IndexDefinition = options.textSearch.split(',').reduce((obj, path) => {
      obj[path] = 'text';
      return obj;
    }, {});

    const idx: IIndexOptions = { fields, options: { background: true } };
    // if (options.paranoid) injectParanoid(idx, paranoid); // TODO: Fix later - This cause error when search text
    indexes.push(idx);
  }

  if (options?.geoSearch) {
    const fields: mongoose.IndexDefinition = { [options.geoSearch]: '2dsphere' };
    const idx: IIndexOptions = { fields, options: { background: true } };
    if (options.paranoid) injectParanoid(idx, paranoid);
    indexes.push(idx);
  }

  toArray(options?.customIndexes).map(idx => {
    idx.options = { background: true, ...idx.options };
    if (paranoid) injectParanoid(idx, paranoid);
    indexes.push(idx);
  });

  return indexes.map(idx => index(idx.fields, idx.options));
}
