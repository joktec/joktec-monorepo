import { applyDecorators, KeyOf, SetMetadata } from '@joktec/core';
import { Entity, EntityOptions, Index, IndexOptions } from 'typeorm';
import { MysqlModel } from '../models';

type KeyTypeOf<T, TYPE> = { [K in keyof T]: T[K] extends TYPE | undefined ? K : never }[keyof T];

export interface IIndexOptions<T extends MysqlModel = any> extends IndexOptions {
  name?: string;
  fields: KeyOf<T>[];
}

export interface ITableOptions<T extends MysqlModel = any> extends EntityOptions {
  keywords?: KeyTypeOf<T, string>[];

  index?: KeyOf<T>[];
  unique?: KeyOf<T>[];
  textSearch?: KeyTypeOf<T, string>[];
  customIndexes?: IIndexOptions<T>[];
}

export const Tables = <T extends MysqlModel = any>(options: ITableOptions<T> = {}): ClassDecorator => {
  return (target: any) => {
    const className = target.name;

    const decorators: ClassDecorator[] = [SetMetadata<string, ITableOptions>(className, options), Entity(options)];

    if (options.index?.length) {
      options.index.map(indexOpts => decorators.push(Index(indexOpts)));
    }

    if (options.unique?.length) {
      options.unique.map(uniqueOpts => decorators.push(Index(uniqueOpts, { unique: true })));
    }

    if (options.textSearch?.length) {
      decorators.push(Index(options.textSearch.map(String), { fulltext: true }));
    }

    if (options.customIndexes?.length) {
      options.customIndexes.map((idxOpts: IIndexOptions) => {
        if (idxOpts.name) decorators.push(Index(idxOpts.name, idxOpts.fields, idxOpts));
        else decorators.push(Index(idxOpts.fields, idxOpts));
      });
    }

    applyDecorators(...decorators)(target);
  };
};
