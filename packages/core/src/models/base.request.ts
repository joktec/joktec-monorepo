/** A union of primitive data types that are allowed in a MongoDB query. */
export type IDataType = string | number | boolean | Date | object;
export type IBindingType = IDataType | IDataType[];

/** A union of MongoDB query operators that can be used to specify more complex conditions */
export type IOperation = '$eq' | '$gt' | '$gte' | '$in' | '$lt' | '$lte' | '$ne' | '$nin';

/** An object that maps string keys to values that can be of type */
export type IOpField = { [op in IOperation]?: IBindingType };
export type ICondition = {
  [key: string]: IBindingType | IOpField | ICondition[];
  $or?: ICondition[];
  $and?: ICondition[];
};

export type ILanguage = '*' | 'vi' | 'en';
export type IKeyword = { [key: string]: string };
export type ISort = { [key: string]: 'asc' | 'desc' };
export type INear = { lat: number; lng: number; distance?: number };

export interface IPopulate {
  [path: string]: '*' | IPopulateOption;
}

export interface IPopulateOption {
  select?: string;
  model?: string;
  populate?: IPopulate;
}

export interface IBaseRequest {
  select?: string;
  keyword?: IKeyword;
  condition: ICondition;
  language?: ILanguage;
  page?: number;
  limit?: number;
  sort?: ISort;
  near?: INear;
  lean?: boolean;
  populate?: IPopulate;
}
