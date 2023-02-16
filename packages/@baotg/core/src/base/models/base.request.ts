/** A union of primitive data types that are allowed in a MongoDB query. */
export type IDataType = string | number | boolean | Date | object;

/** A union of MongoDB query operators that can be used to specify more complex conditions */
export type IOperation = '$eq' | '$gt' | '$gte' | '$in' | '$lt' | '$lte' | '$ne' | '$nin';

/** An object that maps string keys to values that can be of type */
export interface ICondition {
  [key: string]:
    | IDataType
    | { [op in IOperation]?: IDataType | IDataType[] }
    | { $and: ICondition[] }
    | { $or: ICondition[] };
}

export type ILanguage = '*' | 'vi' | 'en';
export type IKeyword = { [key: string]: string };
export type ISort = { [key: string]: 'asc' | 'desc' };

export interface IBaseRequest {
  select?: string[];
  keyword?: IKeyword;
  condition: ICondition;
  language?: ILanguage;
  page?: number;
  limit?: number;
  sort?: ISort;
}
