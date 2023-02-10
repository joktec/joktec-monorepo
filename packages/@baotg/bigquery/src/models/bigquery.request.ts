export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type ISort = { [key: string]: SortOrder };

export interface BigQueryRequest {
  fields: string[];
  where: string[];
  sort?: ISort;
  limit?: number;
  offset?: number;
}

export interface BigQuerySchema {
  name: string;
  type: string;
  mode?: string;
  precision?: string;
  scale?: string;
}

export interface Row {
  [key: string]: any;
}
