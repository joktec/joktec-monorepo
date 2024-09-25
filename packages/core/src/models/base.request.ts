import { Entity, IDateType, IPrimaryType, IZeroType, KeyOf } from './base.dto';

/** A union of primitive data types that are allowed in a MongoDB query. */
export type IDataType = IZeroType | IPrimaryType | IDateType;

/** A union of MongoDB query operators that can be used to specify more complex conditions */
export type ICompare = '$eq' | '$gt' | '$gte' | '$lt' | '$lte' | '$ne';
export type IArrayOperation = '$in' | '$nin' | '$all';
export type INotOperation = '$not';
export type ITextOperation = '$like' | '$begin' | '$end';
export type INumberOperation = '$size';
export type IBoolOperation = '$exists' | '$nil' | '$empty';

/** An object that maps string keys to values that can be of type */
export type IOpField<T> =
  | { [op in ICompare]?: T }
  | { [op in IArrayOperation]?: T[] }
  | { [op in ITextOperation]?: string }
  | { [op in IBoolOperation]?: boolean }
  | { [op in INotOperation]: IOpField<T> };

export type ICondition<T extends Entity = {}> = {
  [key in keyof T]?: T[key] extends (infer U extends IDataType)[]
    ? T[key] | IOpField<T[key]> | U | IOpField<U> | { [op in INumberOperation]?: number }
    : T[key] extends IDataType
      ? T[key] | IOpField<T[key]>
      : T[key] extends (infer U extends Entity)[]
        ? ICondition<U> | { [op in INumberOperation]?: number }
        : T[key] extends Entity
          ? ICondition<T[key]>
          : IDataType | IOpField<T[key]> | ICondition<T[key]>;
} & { $or?: ICondition<T>[]; $and?: ICondition<T>[] };

export type ILanguage = '*' | string;
type IDirection = 'asc' | 'desc';
export type ISort<T extends Entity = {}> = {
  [key in keyof T]?: T[key] extends IDataType | IDataType[]
    ? IDirection
    : T[key] extends (infer U extends Entity)[]
      ? ISort<U>
      : T[key] extends Entity
        ? ISort<T[key]>
        : IDirection;
};

type INearOption = { lat: number; lng: number; distance?: number };
type ICursor<T extends Entity = {}> = '*' | string | { lastCursor: '*' | string; cursorField?: KeyOf<T> };

export type INear<T extends Entity = {}> = {
  [key in keyof T]?: T[key] extends IDataType | IDataType[]
    ? never
    : T[key] extends Entity | Entity[]
      ? INearOption
      : never;
};

export type IPopulate<T extends Entity = {}> = { [key in keyof T]?: '*' | IPopulateOption };
export type IPopulateOption<T extends Entity = any> = {
  select?: string | KeyOf<T>[];
  model?: string;
  populate?: IPopulate<T>;
  match?: ICondition<T>;
};

export interface IBaseRequest<T extends Entity = {}> {
  select?: string | KeyOf<T>[];
  keyword?: string;
  condition?: ICondition<T>;
  language?: ILanguage;
  page?: number;
  limit?: number;
  offset?: number;
  sort?: ISort<T>;
  near?: INear<T>;
  populate?: IPopulate<T>;
  cursor?: ICursor<T>;

  [key: string]: any;
}
