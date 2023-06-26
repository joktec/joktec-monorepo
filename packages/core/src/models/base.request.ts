/** A union of primitive data types that are allowed in a MongoDB query. */
export type IDataType = string | number | boolean | Date | object;
export type IBindingType = IDataType | IDataType[];

/** A union of MongoDB query operators that can be used to specify more complex conditions */
export type IOperation = '$eq' | '$gt' | '$gte' | '$in' | '$lt' | '$lte' | '$ne' | '$nin' | '$like' | '$unlike';

/** An object that maps string keys to values that can be of type */
export type IOpField = { [op in IOperation]?: IBindingType };
export type ICondition<T extends object = {}> = {
  [key in keyof T]?: IBindingType | IOpField | ICondition<T>[];
} & {
  $or?: ICondition<T>[];
  $and?: ICondition<T>[];
};

export type ILanguage = '*' | 'vi' | 'en';
export type ISort<T extends object = {}> = { [key in keyof T]?: 'asc' | 'desc' };
export type INear = { lat: number; lng: number; distance?: number; field?: string };

export type IPopulate<T extends object = {}> = { [key in keyof T]?: '*' | IPopulateOption };
export type IPopulateOption = {
  select?: string;
  model?: string;
  populate?: IPopulate<object>;
  match?: ICondition<object>;
};

export interface IBaseRequest<T extends object = {}> {
  select?: string;
  keyword?: string;
  condition?: ICondition<T>;
  language?: ILanguage;
  page?: number;
  limit?: number;
  sort?: ISort<T>;
  near?: INear;
  populate?: IPopulate<T>;
}
